import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MaskApplierService } from 'ngx-mask';
import { CmsAdminService } from 'src/app/cms-admin/cms-admin.service';
import { CmsComponent } from 'src/app/cms.component';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsFormItem, CmsFormItemOption, CmsFormValidation, CmsFormValidationError } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CmsTranslatePipe } from '../cms.pipe';
import { InputCustomEvent } from '@ionic/angular';
import _ from 'lodash';

@Component({
  selector: 'cms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends CmsComponent implements OnInit {
  @Input('form') form: CmsForm;
  @Input('value') value: object;
  @Input('collection-path') collectionPath: string;
  @Output('submit') submit = new EventEmitter<any>();

  formGroup: FormGroup;

  cannotSubmit: boolean;
  matchingFields: MatchingConfig;

  private maskedItems = [];

  constructor(
    private fb: FormBuilder,
    private date: DatePipe,
    private decimal: DecimalPipe,
    private cmsTranslate: CmsTranslatePipe,
    private cms: CmsService,
    private admin: CmsAdminService,
    private translate: TranslateService,
    private mask: MaskApplierService,
    private appUtils: AppUtils,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && this.formGroup) {
      this.formGroup.patchValue(changes['value'].currentValue);
    }
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (!this.form) {
      return;
    }

    this.matchingFields = {};

    let controls = {};
    for (let item of this.form.items) {
      switch (item.type) {
        case 'datetime':
          let value = null;
          if (this.value) {
            let datetime = (<Timestamp>this.value[item.code]).toDate();
            value = this.date.transform(datetime, 'YYYY-MM-ddTHH:mm');
          }
          controls[item.code] = [value];
          break;

        default:
          controls[item.code] = [this.value ? this.value[item.code] : null];
          break;
      }

      let validators = [];

      if (item.required) {
        validators.push(Validators.required);
      }

      if (item.minimum) {
        validators.push(Validators.min(item.minimum));
      }

      if (item.maximum) {
        validators.push(Validators.max(item.maximum));
      }

      if (item.minimumLength) {
        validators.push(Validators.minLength(item.minimumLength));
      }

      if (item.maximumLength) {
        validators.push(Validators.maxLength(item.maximumLength));
      }

      if (validators.length > 0) {
        controls[item.code].push(Validators.compose(validators));
      }

      if (item.inputMask) {
        this.maskedItems.push(item);
      }

      if (item.matchWith?.length > 0) {
        this.matchingFields[item.code] = item.matchWith;
      }
    }

    let uid = (await this.admin.currentUser)?.uid;
    if (this.value) {
      controls['updatedAt'] = [this.now];
      controls['updatedBy'] = [uid];
    } else {
      controls['createdAt'] = [this.now];
      controls['createdBy'] = [uid];
      controls['updatedAt'] = [this.now];
      controls['updatedBy'] = [uid];
    }

    this.formGroup = this.fb.group(controls, {
      validators: CustomValidators.MatchValidator(this.matchingFields),
    });

    this.maskedItems.forEach((item) => {
      let control = this.formGroup.get(item.code);
      control.valueChanges.subscribe((value) => {
        this.mask.prefix = item.inputPrefix || '';
        control.setValue(this.mask.applyMask(value, item.inputMask), {
          emitEvent: false,
        });
      });
    });

    if (this.form.submitButtonId) {
      document.getElementById(this.form.submitButtonId).addEventListener('click', () => {
        this.onSubmit();
      });
    }
  }

  async onSubmit(event?: Event) {
    let data = this.formGroup.value;

    let datetimeItems = this.form.items.filter((item) => item.type == 'datetime');
    for (let item of datetimeItems) {
      data[item.code] = new Date(data[item.code]);
    }

    if (this.form.autoValidate) {
      let validation = await this.validateFormAndShowErrorMessages();
      if (!validation.valid) {
        return;
      }
    }

    if (this.form.autoRemoveUnusedKeys) {
      data = this.removeUnusedKeys(this.form.autoRemoveUnusedKeys, data);
    }

    this.submit.emit(data);
  }

  onPrint(event?: Event) {
    console.log(this.formGroup);
  }

  getArray(item: CmsFormItem) {
    return this.value[item.code] as Array<any>;
  }

  getForm(item: CmsFormItem) {
    return this.cms.getForm(item.dataType);
  }

  async validateForm(): Promise<CmsFormValidation> {
    if (this.formGroup.valid) {
      return { valid: true };
    }
    let validationErrors: CmsFormValidationError[] = [];
    let controls = this.formGroup.controls;
    for (let controlKey of Object.keys(controls)) {
      let errors = controls[controlKey].errors;
      if (errors) {
        for (let errorKey of Object.keys(errors)) {
          let error = errors[errorKey];
          let field = this.form.items.find((i) => i.code == controlKey);
          let label = this.cmsTranslate.transform(field.label);
          let messageKey: string;
          let messageParams = { label: label };
          switch (errorKey) {
            case 'required':
              messageKey = '_IS_REQUIRED';
              break;
            case 'min':
              messageKey = '_REQUIRES_MINIMUM';
              messageParams['min'] = error.min;
              break;
            case 'max':
              messageKey = '_REQUIRES_MAXIMUM';
              messageParams['max'] = error.min;
              break;
            case 'minlength':
              messageKey = '_REQUIRES_MINIMUM_LENGTH';
              messageParams['minLength'] = error.requiredLength;
              break;
            case 'maxlength':
              messageKey = '_REQUIRES_MAXIMUM_LENGTH';
              messageParams['maxLength'] = error.requiredLength;
              break;
            case 'notMatching':
              messageKey = '_REQUIRES_MATCH_WITH';
              messageParams['matchingFields'] = this.form.items
                .filter((i) => error.fields.includes(i.code))
                .map((f) => this.cmsTranslate.transform(f.label))
                .join(', ');
              break;
            default:
              messageKey = '_HAS_UNKNOWN_ERROR';
              break;
          }
          let message = await this.translate.get(messageKey, messageParams).toPromise();
          validationErrors.push({
            error: errors,
            message: message,
          });
        }
      }
    }
    return {
      valid: false,
      errors: validationErrors,
    };
  }

  async validateFormAndShowErrorMessages() {
    let validation = await this.validateForm();
    if (!validation.valid) {
      let messages = validation.errors.map((e) => "<p class='ion-no-margin'>" + e.message + '</p>').join('');
      this.appUtils.presentAlert(messages, '_ERROR');
    }
    return validation;
  }

  removeUnusedKeys<T>(from: 'swserp', source: T, keys?: string[]) {
    let cloned = _.cloneDeep(source);
    if (keys?.length > 0) {
      for (let key of keys) {
        delete cloned[key];
      }
    } else {
      switch (from) {
        case 'swserp':
          delete cloned['createdAt'];
          delete cloned['createdBy'];
          delete cloned['updatedAt'];
          delete cloned['updatedBy'];
          break;
        default:
          break;
      }
    }
    return cloned;
  }

  resetForm() {
    this.formGroup.reset();
  }

  markAsEditable(key?: string) {
    if (!key) {
      this.formGroup.enable();
    } else {
      this.formGroup.get(key).enable();
    }
  }

  markAsNonEditable(key?: string) {
    if (!key) {
      this.formGroup.disable();
    } else {
      this.formGroup.get(key).disable();
    }
  }

  markAsSubmitable() {
    this.cannotSubmit = false;
  }

  markAsNonSubmitable() {
    this.cannotSubmit = true;
  }

  onQuickButtonClick(item: CmsFormItem, button: CmsFormItemOption) {
    this.formGroup.patchValue({
      [item.code]: button.code,
    });
  }

  onNumberChange(event: Event, code: string) {
    let value = (<InputCustomEvent>event).detail.value;
    let item = this.form.items.find((i) => i.code == code);
    if (item.precision) {
      let num = Number(value) / Math.pow(10, item.precision);
      // TODO: Set value and do not trigger change event
      // console.log(num);
    }
  }
}

interface MatchingConfig {
  [key: string]: string[];
}

class NeedMatching {
  private _CONTROL: AbstractControl;
  private _KEY: string;
  get control() {
    return this._CONTROL;
  }
  get key() {
    return this._KEY;
  }
  constructor(control: AbstractControl, key: string) {
    this._CONTROL = control.get(key);
    this._KEY = key;
  }
}

class CustomValidators {
  static MatchValidator(config: MatchingConfig): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      for (let key of Object.keys(config)) {
        let matchingFrom = control.get(key);
        let needMatching = config[key].map((c) => new NeedMatching(control, c));
        let notMatching = needMatching.filter((n) => n.control.value != matchingFrom.value);
        let allMatched = notMatching.length <= 0;
        if (!allMatched) {
          matchingFrom.setErrors({ notMatching: { fields: notMatching.map((n) => n.key) } });
        } else {
          if (matchingFrom.errors) {
            let keys = Object.keys(matchingFrom.errors);
            if (keys.length > 0 && keys.includes('notMatching')) {
              delete matchingFrom.errors['notMatching'];
              if (keys.length == 1) {
                matchingFrom.setErrors(null);
              }
            }
          }
        }
      }
      return null;
    };
  }
}

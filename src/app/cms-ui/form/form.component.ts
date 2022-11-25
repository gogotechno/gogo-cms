import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MaskApplierService } from 'ngx-mask';
import _ from 'lodash';
import { CmsAdminService } from 'src/app/cms-admin/cms-admin.service';
import { CmsComponent } from 'src/app/cms.component';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsFormItem, CmsFormValidation } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CmsTranslatePipe } from '../cms.pipe';

@Component({
  selector: 'cms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends CmsComponent implements OnInit {
  @Input('form') form: CmsForm;
  @Input('value') value: { [key: string]: any };
  @Input('collection-path') collectionPath: string;
  @Output('submit') submit = new EventEmitter<any>();

  formGroup: FormGroup;

  cannotSubmit: boolean;
  matchingFields: MatchingConfig;

  private _maskedItems = [];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cmsTranslate: CmsTranslatePipe,
    private cms: CmsService,
    private admin: CmsAdminService,
    private translate: TranslateService,
    private mask: MaskApplierService,
    private app: AppUtils,
  ) {
    super();
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
          controls[item.code] = [
            this.value
              ? this.datePipe.transform((<Timestamp>this.value[item.code]).toDate(), 'YYYY-MM-ddTHH:mm')
              : null,
          ];
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
        this._maskedItems.push(item);
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

    this.formGroup = this.fb.group(controls, { validators: CustomValidators.MatchValidator(this.matchingFields) });

    this._maskedItems.forEach((item) => {
      let control = this.formGroup.get(item.code);
      this.mask.prefix = item.inputPrefix || '';
      control.setValue(this.mask.applyMask(control.value, item.inputMask), { emitEvent: false });
      control.valueChanges.subscribe((v) => {
        this.mask.prefix = item.inputPrefix || '';
        control.setValue(this.mask.applyMask(v, item.inputMask), { emitEvent: false });
      });
    });
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

  async validateForm() {
    let validation: CmsFormValidation;
    if (this.formGroup.valid) {
      validation = { valid: true };
      return validation;
    }
    validation = { valid: false, errors: [] };
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
          validation.errors.push({ error: errors, message: message });
        }
      }
    }
    return validation;
  }

  async validateFormAndShowErrorMessages() {
    let validation = await this.validateForm();
    if (!validation.valid) {
      let messages = validation.errors.map((e) => "<p class='ion-no-margin'>" + e.message + '</p>').join('');
      this.app.presentAlert(messages, '_ERROR');
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

  patchValue(value: { [key: string]: any }) {
    this.formGroup.patchValue(value);
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

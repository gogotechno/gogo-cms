import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MaskApplierService } from 'ngx-mask';
import { CmsAdminService } from 'src/app/cms-admin/cms-admin.service';
import { CmsComponent } from 'src/app/cms.component';
import { CmsService } from 'src/app/cms.service';
import {
  CmsForm,
  CmsFormItem,
  CmsFormItemOption,
  CmsFormValidation,
  CmsFormValidationError,
  LiteralObject,
} from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CmsTranslatePipe } from '../cms.pipe';
import { InputCustomEvent } from '@ionic/angular';
import dayjs from 'dayjs';
import _ from 'lodash';

@Component({
  selector: 'cms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends CmsComponent implements OnInit {
  @Input() form: CmsForm;
  @Input() value: LiteralObject;
  @Input('collection-path') collectionPath: string;
  @Output() submit = new EventEmitter<any>();

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
    if (changes.value && this.formGroup) {
      let value = {};
      for (let item of this.form.items) {
        let controlValue = this.getControlValue(item, changes.value.currentValue);
        value[item.code] = controlValue;
      }
      this.formGroup.patchValue(value);
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

    const controls: any = {};

    for (const item of this.form.items) {
      switch (item.type) {
        case 'pin':
          if (!item.minimumLength) {
            item.minimumLength = 6;
          }
          break;

        case 'files':
          if (!item.fileConfig?.multiple) {
            item.maximum = 1;
          }
          break;

        default:
          break;
      }

      controls[item.code] = [this.getControlValue(item, this.value)];

      const validators = [];

      if (item.required) {
        validators.push(Validators.required);
      }

      if (item.minimum) {
        if (item.type == 'files') {
          validators.push(CustomValidators.minSize(item.minimum));
        } else {
          validators.push(Validators.min(item.minimum));
        }
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

    const uid = (await this.admin.currentUser)?.uid;
    if (this.value) {
      controls.updatedAt = [this.now];
      controls.updatedBy = [uid];
    } else {
      controls.createdAt = [this.now];
      controls.createdBy = [uid];
      controls.updatedAt = [this.now];
      controls.updatedBy = [uid];
    }

    this.formGroup = this.fb.group(controls, {
      validators: CustomValidators.match(this.matchingFields),
    });

    this.maskedItems.forEach((item) => {
      const control = this.formGroup.get(item.code);
      control.valueChanges.subscribe((value) => {
        this.mask.prefix = item.inputPrefix || '';
        control.setValue(this.mask.applyMask(value, item.inputMask), {
          emitEvent: false,
        });
      });
    });

    if (this.form.submitButtonId) {
      let button = document.getElementById(this.form.submitButtonId);
      if (button) {
        button.addEventListener('click', () => {
          this.onSubmit();
        });
      }
    }
  }

  getControlValue(item: CmsFormItem, value: LiteralObject) {
    let controlCode = item.code;
    let controlValue = null;
    let defaultValue = null;
    if (value) {
      if (item.referTo && value[item.referTo]) {
        controlCode = item.referTo;
      }
      defaultValue = value[controlCode];
    }
    switch (item.type) {
      case 'datetime':
      case 'date':
        if (defaultValue) {
          let dateFormat: string;
          switch (item.type) {
            case 'date':
              dateFormat = 'YYYY-MM-dd';
              break;
            default:
              dateFormat = 'YYYY-MM-ddTHH:mm';
              break;
          }
          try {
            let timestampValue = <Timestamp>defaultValue;
            controlValue = this.date.transform(timestampValue.toDate(), dateFormat);
          } catch (err) {
            controlValue = this.date.transform(defaultValue, dateFormat);
          }
        }
        break;
      case 'checkbox':
        if (value) {
          let checkboxValue = value[controlCode];
          if (checkboxValue != (null || undefined)) {
            controlValue = checkboxValue;
          }
        }
        break;
      default:
        if (defaultValue) {
          controlValue = defaultValue;
        }
    }
    return controlValue;
  }

  async onSubmit(event?: Event) {
    let formValue = this.formGroup.value;
    for (let item of this.form.items) {
      switch (item.type) {
        case 'datetime':
        case 'date':
          if (formValue[item.code]) {
            if (item.dateFormat) {
              formValue[item.code] = dayjs(formValue[item.code]).format(item.dateFormat);
            } else {
              formValue[item.code] = new Date(formValue[item.code]);
            }
          }
          break;
        case 'cms-translate':
        case 'cms-translate-editor':
          if (formValue[item.code]) {
            if (item.stringify) {
              formValue[item.code] = JSON.stringify(formValue[item.code]);
            }
          }
          break;
        case 'checkbox':
          if (item.required && !formValue[item.code]) {
            formValue[item.code] = false;
          }
          break;
        default:
          break;
      }
    }
    if (this.form.autoValidate) {
      let validation = await this.validateFormAndShowErrorMessages();
      if (!validation.valid) {
        return;
      }
    }
    if (this.form.autoRemoveUnusedKeys) {
      formValue = this.removeUnusedKeys(this.form.autoRemoveUnusedKeys, formValue);
    }
    this.submit.emit(formValue);
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
    const validationErrors: CmsFormValidationError[] = [];
    const controls = this.formGroup.controls;
    for (const controlKey of Object.keys(controls)) {
      const errors = controls[controlKey].errors;
      if (errors) {
        for (const errorKey of Object.keys(errors)) {
          const error = errors[errorKey];
          const field = this.form.items.find((i) => i.code == controlKey);
          const label = await this.translate.get(this.cmsTranslate.transform(field.label)).toPromise();
          let messageKey: string;
          const messageParams: any = { label };
          switch (errorKey) {
            case 'required':
              messageKey = '_IS_REQUIRED';
              break;
            case 'min':
              messageKey = '_REQUIRES_MINIMUM';
              messageParams.min = error.min;
              break;
            case 'max':
              messageKey = '_REQUIRES_MAXIMUM';
              messageParams.max = error.min;
              break;
            case 'minlength':
              messageKey = '_REQUIRES_MINIMUM_LENGTH';
              messageParams.minLength = error.requiredLength;
              break;
            case 'maxlength':
              messageKey = '_REQUIRES_MAXIMUM_LENGTH';
              messageParams.maxLength = error.requiredLength;
              break;
            case 'notMatching':
              messageKey = '_REQUIRES_MATCH_WITH';
              messageParams.matchingFields = this.form.items
                .filter((i) => error.fields.includes(i.code))
                .map(async (f) => await this.translate.get(this.cmsTranslate.transform(f.label)).toPromise())
                .join(', ');
              break;
            default:
              messageKey = '_HAS_UNKNOWN_ERROR';
              break;
          }
          const message = await this.translate.get(messageKey, messageParams).toPromise();
          validationErrors.push({
            error: errors,
            message,
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
    const validation = await this.validateForm();
    if (!validation.valid) {
      const messages = validation.errors.map((e) => "<p class='ion-no-margin'>" + e.message + '</p>').join('');
      this.appUtils.presentAlert(messages, '_ERROR');
    }
    return validation;
  }

  removeUnusedKeys<T>(from: 'swserp', source: T, keys?: string[]) {
    const cloned = _.cloneDeep(source) as any;
    if (keys?.length > 0) {
      for (const key of keys) {
        delete cloned[key];
      }
    } else {
      switch (from) {
        case 'swserp':
          delete cloned.createdAt;
          delete cloned.createdBy;
          delete cloned.updatedAt;
          delete cloned.updatedBy;
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
    const value = (<InputCustomEvent>event).detail.value;
    const item = this.form.items.find((i) => i.code == code);
    if (item.precision) {
      const num = Number(value) / Math.pow(10, item.precision);
      // TODO: Set value and do not trigger change event
    }
  }

  onSearchableItemsChange(code: string, items: Array<any>) {
    let index = this.form.items.findIndex((i) => i.code == code);
    this.form.items[index].items = items;
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
  static match(config: MatchingConfig): ValidatorFn {
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
              delete matchingFrom.errors.notMatching;
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

  static minSize(minimum: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.hasError('required') && !control.value) {
        return null;
      }
      if (!control.value || control.value.length < minimum) {
        return {
          min: {
            min: minimum,
            actual: control.value?.length || 0,
          },
        };
      }
      return null;
    };
  }
}

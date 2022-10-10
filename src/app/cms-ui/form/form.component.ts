import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private cms: CmsService,
    private admin: CmsAdminService,
    private translate: TranslateService,
    private cmsTranslate: CmsTranslatePipe,
    private app: AppUtils
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (!this.form) return;

    let controls = {};
    for (let item of this.form.items) {
      switch (item.type) {
        case "datetime":
          controls[item.code] = [this.value ? this.datePipe.transform((<Timestamp>this.value[item.code]).toDate(), "YYYY-MM-ddTHH:mm") : null];
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

      if (validators.length > 0) {
        controls[item.code].push(Validators.compose(validators));
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

    this.formGroup = this.formBuilder.group(controls);
  }

  onSubmit(event?: Event) {
    let data = this.formGroup.value;

    let datetimeItems = this.form.items.filter((item) => item.type == "datetime");
    for (let item of datetimeItems) {
      data[item.code] = new Date(data[item.code]);
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
      validation = {
        valid: true
      };
      return validation;
    }

    validation = {
      valid: false,
      errors: []
    };

    let controls = this.formGroup.controls;
    for (let control of Object.keys(controls)) {
      let errors = controls[control].errors;
      if (errors) {
        for (let errorKey of Object.keys(errors)) {
          let error = errors[errorKey];
          let field = this.form.items.find((i) => i.code == control);
          let label = this.cmsTranslate.transform(field.label);
          let messageKey: string;
          let messageParams = { label: label };
          switch (errorKey) {
            case "min":
              messageKey = "_REQUIRES_MINIMUM";
              messageParams["min"] = error.min;
              break;

            case "required":
              messageKey = "_IS_REQUIRED";
              break;

            default:
              messageKey = "_HAS_UNKNOWN_ERROR"
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
      let messages = validation.errors.map((e) => "<p class='ion-no-margin'>" + e.message + "</p>").join("");
      this.app.presentAlert(messages, "_ERROR");
    }

    return validation;
  }

}

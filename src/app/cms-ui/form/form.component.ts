import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CmsAdminService } from 'src/app/cms-admin/cms-admin.service';
import { CmsComponent } from 'src/app/cms.component';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsFormItem, CmsFormValidation } from 'src/app/cms.type';
import { CmsTranslatePipe } from '../cms.pipe';

@Component({
  selector: 'cms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends CmsComponent implements OnInit {

  @Input('form') form: CmsForm;
  @Input('value') value: any;
  @Output('submit') submit = new EventEmitter<any>();

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cms: CmsService,
    private admin: CmsAdminService,
    private cmsTranslate: CmsTranslatePipe,
    private translate: TranslateService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (!this.form) return;

    let controls = {};
    this.form.items.forEach((item) => {
      switch (item.type) {
        // case 'array':
        //   controls[item.code] = this.formBuilder.array([]);
        //   break;

        default:
          controls[item.code] = [this.value ? this.value[item.code] : null];
          break;
      }

      if (item.required) {
        controls[item.code].push(Validators.required);
      }
    });

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
        for (let error of Object.keys(errors)) {
          let field = this.form.items.find((i) => i.code == control);
          let label = this.cmsTranslate.transform(field.label);
          let messageKey: string;
          let messageParams: { label: string } = { label: label };
          switch (error) {
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

}

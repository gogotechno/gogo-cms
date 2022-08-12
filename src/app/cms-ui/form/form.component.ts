import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsFormItem } from 'src/app/cms.type';

@Component({
  selector: 'cms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input('form') form: CmsForm;
  @Input('value') value: any;
  @Output('submit') submit = new EventEmitter<any>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (!this.form) return;

    let controls = {};
    this.form.items.forEach(item => {
      switch (item.type) {
        // case 'array':
        //   controls[item.code] = this.formBuilder.array([]);
        //   break;

        default:
          controls[item.code] = [this.value ? this.value[item.code] : null];
          break;
      }
    });
    this.formGroup = this.formBuilder.group(controls);
    // this.value = this.formGroup.value;
  }

  onSubmit(event?: Event) {
    let data = this.formGroup.value;
    console.log(data);
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

}

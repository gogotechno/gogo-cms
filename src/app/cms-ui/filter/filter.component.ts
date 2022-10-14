import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CmsFilter, CmsFilterItem } from 'src/app/cms.type';
import _ from 'lodash';

@Component({
  selector: 'cms-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input('form') form: CmsFilter;
  @Input('value') value: { [key: string]: any };
  @Output('submit') submit = new EventEmitter<any>();
  @Output('reset') reset = new EventEmitter<any>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (!this.form) return;
    this.formGroup = this.fb.group({});
    for (let item of this.form.items) {
      switch (item.type) {
        case "date-between":
          this.formGroup.setControl(this.getDateBetweenFormControlName("from", item.code), this.loadControl(item));
          this.formGroup.setControl(this.getDateBetweenFormControlName("to", item.code), this.loadControl(item));
          break;
        default:
          this.formGroup.setControl(item.code, this.loadControl(item));
          break;
      }
    }

    this.formGroup.patchValue(this.value);
  }

  private loadControl(item: CmsFilterItem) {
    let control = new FormControl();
    let validators = [];
    if (item.required) validators.push(Validators.required);
    if (validators.length > 0) control.setValidators(validators);
    return control;
  }

  onSearchableSelectFilterItemChange(code: string, item: CmsFilterItem) {
    let index = this.form.items.findIndex((i) => i.code == code);
    this.form.items[index] = item;
  }

  getDateBetweenFormControlName(type: "from" | "to", code: string) {
    return `${code}_${type}`;
  }

  getDateBetweenInputType(type: "date" | "time" | "datetime") {
    switch (type) {
      case "time":
        return "time";
      case "datetime":
        return "datetime-local";
      default:
        return "date";
    }
  }

  onPrint(event?: Event) {
    console.log(this.formGroup.value);
  }

  onReset() {
    this.resetForm();
    this.reset.emit(this.formGroup.value);
  }

  onApply() {
    this.submit.emit(this.formGroup.value);
  }

  resetForm() {
    this.formGroup.reset();
    this.form.items.filter((i) => i.type == "select" && i.searchable).forEach((i) => i.selectConfig.selectedItems = []);
  }

  removeEmptyKeys<T>(source: T) {
    let cloned = _.cloneDeep(source);
    Object.keys(cloned).forEach((key) => !cloned[key] ? delete cloned[key] : cloned[key]);
    return cloned;
  }

}

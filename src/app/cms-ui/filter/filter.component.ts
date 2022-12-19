import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CmsFilter, CmsFilterItem } from 'src/app/cms.type';
import _ from 'lodash';

@Component({
  selector: 'cms-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() form: CmsFilter;
  @Input() value: { [key: string]: any };
  @Output() submit = new EventEmitter<any>();
  @Output() reset = new EventEmitter<any>();

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (!this.form) return;
    this.formGroup = this.fb.group({});
    for (const item of this.form.items) {
      switch (item.type) {
        case 'date-between':
          this.formGroup.setControl(this.getDateBetweenFormControlName('from', item.code), this.loadControl(item));
          this.formGroup.setControl(this.getDateBetweenFormControlName('to', item.code), this.loadControl(item));
          break;
        default:
          this.formGroup.setControl(item.code, this.loadControl(item));
          break;
      }
    }

    this.formGroup.patchValue(this.value);
  }

  private loadControl(item: CmsFilterItem) {
    const control = new FormControl();
    const validators: ValidatorFn[] = [];
    if (item.required) {
      validators.push(Validators.required);
    }
    if (validators.length > 0) {
      control.setValidators(validators);
    }
    return control;
  }

  onSearchableSelectFilterItemChange(code: string, item: CmsFilterItem) {
    const index = this.form.items.findIndex((i) => i.code == code);
    this.form.items[index] = item;
  }

  getDateBetweenFormControlName(type: 'from' | 'to', code: string) {
    return `${code}_${type}`;
  }

  getDateBetweenInputType(type: 'date' | 'time' | 'datetime') {
    switch (type) {
      case 'time':
        return 'time';
      case 'datetime':
        return 'datetime-local';
      default:
        return 'date';
    }
  }

  onPrint(event?: Event) {
    console.log(this.formGroup.value);
  }

  onReset() {
    this.resetForm();
    let formValue = this.formGroup.value;
    if (this.form.disallowEmpty) {
      formValue = this.removeEmptyKeys(formValue);
    }
    this.reset.emit(formValue);
  }

  onApply() {
    let formValue = this.formGroup.value;
    if (this.form.disallowEmpty) {
      formValue = this.removeEmptyKeys(formValue);
    }
    this.submit.emit(formValue);
  }

  resetForm() {
    this.formGroup.reset();
    this.form.items
      .filter((i) => i.type == 'select' && i.searchable)
      .forEach((i) => (i.selectConfig.selectedItems = []));
  }

  removeEmptyKeys<T>(source: T) {
    const cloned = _.cloneDeep(source);
    Object.keys(cloned).forEach((key) => {
      if (!cloned[key]) {
        delete cloned[key];
      }
    });
    if (Object.keys(cloned).length == 0) {
      return null;
    }
    return cloned;
  }
}

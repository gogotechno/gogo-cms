import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonModal, ItemReorderCustomEvent } from '@ionic/angular';
import { CmsService } from 'src/app/cms.service';
import { ArrayConfig, CmsForm, CmsTable } from 'src/app/cms.type';
import { AppUtils, array_move } from 'src/app/cms.util';

@Component({
  selector: 'cms-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArrayInputComponent),
      multi: true,
    },
  ],
})
export class ArrayInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild(IonModal) modal: IonModal;

  @Input('data-type') dataType: string;
  @Input('collection-path') collectionPath: string;
  @Input('custom-form') customForm: CmsForm;
  @Input('config') config: ArrayConfig;

  form: CmsForm;
  table: CmsTable;
  value: Array<any> = [];
  activatedIndex: number;

  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  get activatedValue() {
    let value = null;
    if (this.activatedIndex != null) {
      value = this.value[this.activatedIndex];
    }
    return value;
  }

  get submitButtonId() {
    if (this.activatedIndex != null) {
      return `array-${this.activatedIndex}-btn`;
    }
    return 'array-new-btn';
  }

  constructor(private appUtils: AppUtils, private cms: CmsService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (this.dataType) {
      switch (this.dataType) {
        case 'text':
          this.form = {
            code: 'text-form',
            items: [
              {
                code: 'value',
                label: '_TEXT_VALUE',
                type: 'text',
              },
            ],
          };
          break;
        case 'custom':
          this.form = this.customForm;
          break;
        default:
          this.form = await this.cms.getForm(this.dataType);
          this.table = await this.cms.getTable(this.dataType);
          break;
      }
    }
  }

  writeValue(value: Array<any>): void {
    if (!value) {
      value = [];
    }
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async remove(i: number) {
    let confirm = await this.appUtils.presentConfirm('_DELETE_CONFIRMATION_MESSAGE');
    if (confirm) {
      this.value.splice(i, 1);
      this.onChange(this.value);
    }
  }

  reorder(event: Event) {
    const detail = (<ItemReorderCustomEvent>event).detail;
    this.value = array_move(this.value, detail.from, detail.to);
    this.onChange(this.value);
    detail.complete(true);
  }

  edit(i: number, event?: Event) {
    this.activatedIndex = i;
    if (this.config?.submitButtonPosition == 'footer') {
      this.form.submitButtonId = this.submitButtonId;
    }
    this.modal.present();
  }

  onWillDismiss(event: Event) {
    this.activatedIndex = null;
    this.form.submitButtonId = null;
  }

  cancel(event: Event) {
    this.modal.dismiss();
  }

  update(item: { [key: string]: any }) {
    if (this.activatedIndex != null) {
      this.value[this.activatedIndex] = this.dataType == 'text' ? item.value : item;
    } else {
      switch (this.dataType) {
        case 'text':
          this.value.push(item.value);
          break;
        default:
          this.value.push(item);
          break;
      }
    }
    this.onChange(this.value);
    this.modal.dismiss();
  }

  add(event?: Event) {
    if (this.config?.submitButtonPosition == 'footer') {
      this.form.submitButtonId = this.submitButtonId;
    }
    this.modal.present();
  }

  getName(item: any) {
    try {
      if (this.config) {
        return this.config.nameFields.map((f) => item[f]).join(this.config.nameSeparator || ' ');
      }
      return item[this.table.nameField];
    } catch (err) {
      return '-';
    }
  }
}

import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonModal, ItemReorderCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsService } from 'src/app/cms.service';
import { ArrayConfig, CmsForm, CmsTable, CmsTranslable } from 'src/app/cms.type';
import { AppUtils, array_move, CmsUtils } from 'src/app/cms.util';
import { CmsTranslatePipe } from '../cms.pipe';

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

  prefixKeys: string[];

  constructor(
    private appUtils: AppUtils,
    private cmsUtils: CmsUtils,
    private translate: TranslateService,
    private cmsTranslate: CmsTranslatePipe,
    private cms: CmsService,
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
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
    if (this.config?.prefixes) {
      this.prefixKeys = Object.keys(this.config.prefixes);
    }
  }

  async writeValue(value: Array<any>): Promise<void> {
    if (!value) {
      value = [];
    }
    this.value = await this.writeArray(value);
    this.changeValue(this.value);
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

  cancel(event: Event) {
    this.modal.dismiss();
  }

  async update(item: any) {
    let rawItem = this.dataType == 'text' ? item.value : item;
    let updatedItem = await this.writeObject(rawItem);
    if (this.activatedIndex != null) {
      this.value[this.activatedIndex] = updatedItem;
    } else {
      this.value.push(updatedItem);
    }
    this.changeValue(this.value);
    this.modal.dismiss();
  }

  add(event?: Event) {
    if (this.config?.submitButtonPosition == 'footer') {
      this.form.submitButtonId = this.submitButtonId;
    }
    this.modal.present();
  }

  onWillDismiss(event: Event) {
    this.activatedIndex = null;
    this.form.submitButtonId = null;
  }

  getName(item: any) {
    try {
      return item[this.table.nameField];
    } catch (err) {
      return '';
    }
  }

  async getTranslation(value: CmsTranslable) {
    let translable = this.cmsUtils.parseCmsTranslation(value);
    let translation = this.cmsTranslate.transform(translable);
    if (translation && typeof translation == 'string') {
      translation = await this.translate.get(translation).toPromise();
    }
    if (!translation) {
      return '-';
    }
    return translation;
  }

  async writeArray(value: any[]) {
    let cloned = await Promise.all(
      value.map(async (item) => {
        item = await this.writeObject(item);
        return item;
      }),
    );
    return cloned;
  }

  async writeObject(item: any) {
    if (typeof item == 'string') {
      return item;
    }
    if (this.config?.nameFields) {
      item['arrayItemLabel'] = await this.getNameFromFields(item);
    }
    return item;
  }

  async getNameFromFields(item: any) {
    let names = await Promise.all(
      this.config.nameFields.map(async (f) => {
        let nameFormItem = this.form.items.find((item) => item.code == f);
        let nameValue = item[f];
        if (nameFormItem.referTo && item[nameFormItem.referTo]) {
          nameValue = item[nameFormItem.referTo];
        }
        if (nameFormItem.type == 'checkbox') {
          nameValue = nameValue == 1 ? '_YES' : '_NO';
        }
        let name = await this.getTranslation(nameValue);
        if (this.prefixKeys && this.prefixKeys.includes(f)) {
          let prefixField = this.config.prefixes[f];
          let prefixFormItem = this.form.items.find((item) => item.code == prefixField);
          let prefix = await this.getTranslation(prefixFormItem.label);
          if (prefix) {
            return `${prefix}${this.config.prefixSeparator || ' '}${name}`;
          }
        }
        return name;
      }),
    );
    return names.join(this.config.nameSeparator || ' ');
  }

  changeValue(value: any[]) {
    let cloned = this.removeKeys(value);
    this.onChange(cloned);
  }

  removeKeys(value: any[]) {
    return value.map((v) => {
      let cloned = {};
      for (let item of this.form.items) {
        cloned[item.code] = v[item.code];
      }
      return cloned;
    });
  }
}

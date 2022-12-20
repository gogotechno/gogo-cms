import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  CmsTranslable,
  OnSelectLoad,
  OnSelectScrollToEnd,
  SearchableConfig,
  SearchableHanlder,
} from 'src/app/cms.type';
import { SearchAreaComponent } from './search-area/search-area.component';

@Component({
  selector: 'cms-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true,
    },
  ],
})
export class SearchableSelectComponent implements OnInit, ControlValueAccessor {
  @Input('code') code: string;
  @Input('label') label: CmsTranslable;
  @Input('config') config: SearchableConfig;
  @Input('handler') handler: SearchableHanlder;
  @Input('items') items: any;
  @Output('itemsChange') itemsChange: any;

  value: string;
  disabled: boolean;
  onChange: any = () => {};
  onTouched: any = () => {};

  labelFields: string[];
  labelSeparator: string;

  codeFields: string[];
  codeSeparator: string;

  selectedItems: any[];

  onLoad: OnSelectLoad;
  onScrollToEnd: OnSelectScrollToEnd;

  get labelId() {
    return `cms-sel-${this.code}-lbl`;
  }

  get clickId() {
    return `cms-sel-${this.code}-clk`;
  }

  get selectedLabel() {
    let label = '';
    this.selectedItems.forEach((i) => (label += this.labelFields.map((f) => i[f]).join(this.labelSeparator)));
    return label;
  }

  get selectCode() {
    let code = '';
    this.selectedItems.forEach((i) => (code += this.codeFields.map((f) => i[f]).join(this.codeSeparator)));
    return code;
  }

  constructor(private modalCtrl: ModalController) {
    this.itemsChange = new EventEmitter();
  }

  ngOnInit() {
    this.selectedItems = [];
    if (this.items) {
      this.selectedItems = this.items;
    }
    this.labelFields = this.config?.labelFields || [];
    this.labelSeparator = this.config?.labelSeparator || ' ';
    this.codeFields = this.config?.codeFields || [];
    this.codeSeparator = this.config?.codeSeparator || ' ';
    this.onLoad = this.handler?.onLoad;
    this.onScrollToEnd = this.handler?.onScrollToEnd;
    if (!this.onLoad) {
      console.warn('onLoad is not provided!');
    }
    if (!this.onScrollToEnd) {
      console.warn('onScrollToEnd is not provided!');
    }
  }

  writeValue(value: string) {
    this.value = value;
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  async onSelect() {
    const modal = await this.modalCtrl.create({
      component: SearchAreaComponent,
      componentProps: {
        title: this.label,
        labelFields: this.labelFields,
        labelSeparator: this.labelSeparator,
        codeFields: this.codeFields,
        codeSeparator: this.codeSeparator,
        onLoad: this.onLoad,
        onScrollToEnd: this.onScrollToEnd,
        selectedItems: this.selectedItems,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.items) {
      this.selectedItems = data?.items;
      this.onChange(this.selectCode);
      this.items = this.selectedItems;
      this.itemsChange.emit(this.items);
    }
  }
}

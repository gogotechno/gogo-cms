import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CmsFilterItem, OnSelectLoad, OnSelectScrollToEnd } from 'src/app/cms.type';
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
  @Input('filterItem') filterItem: CmsFilterItem;
  @Output('filterItemChange') filterItemChange: EventEmitter<CmsFilterItem>;

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
    return `cms-sel-${this.filterItem.code}-lbl`;
  }

  get clickId() {
    return `cms-sel-${this.filterItem.code}-clk`;
  }

  get selectedLabel() {
    let label: string = '';
    this.selectedItems.forEach((i) => (label += this.labelFields.map((f) => i[f]).join(this.labelSeparator)));
    return label;
  }

  get selectCode() {
    let code: string = '';
    this.selectedItems.forEach((i) => (code += this.codeFields.map((f) => i[f]).join(this.codeSeparator)));
    return code;
  }

  constructor(private modalCtrl: ModalController) {
    this.filterItemChange = new EventEmitter<CmsFilterItem>();
  }

  ngOnInit() {
    this.selectedItems = this.filterItem.selectConfig?.selectedItems || [];

    this.labelFields = this.filterItem.selectConfig?.labelFields || [];
    this.labelSeparator = this.filterItem.selectConfig?.labelSeparator || ' ';

    this.codeFields = this.filterItem.selectConfig?.codeFields || [];
    this.codeSeparator = this.filterItem.selectConfig?.codeSeparator || ' ';

    this.onLoad = this.filterItem.selectHandler?.onLoad;
    this.onScrollToEnd = this.filterItem.selectHandler?.onScrollToEnd;

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
        title: this.filterItem.label,
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

      this.filterItem.selectConfig.selectedItems = this.selectedItems;
      this.filterItemChange.emit(this.filterItem);
    }
  }
}

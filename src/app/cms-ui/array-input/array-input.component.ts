import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonModal, ItemReorderCustomEvent } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsTable } from 'src/app/cms.type';
import { array_move } from 'src/app/cms.util';

@Component({
  selector: 'cms-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArrayInputComponent),
      multi: true
    },
    TranslatePipe
  ]
})
export class ArrayInputComponent implements OnInit, ControlValueAccessor {

  @ViewChild(IonModal) modal: IonModal;
  @Input('data-type') dataType: string;
  form: CmsForm;
  // table: CmsTable;
  value: Array<any>;
  disabled = false;
  onChange: any = () => { };
  onTouched: any = () => { };
  activatedIndex: number;

  constructor(private translate: TranslatePipe, private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (this.dataType) {
      this.form = await this.cms.getForm(this.dataType);
      // this.table = await this.cms.getTable(this.dataType);
    }
  }

  writeValue(value: Array<any>): void {
    this.value = value;
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

  remove(i: number) {
    if (confirm(this.translate.transform('_DELETE_CONFIRMATION_MESSAGE'))) {
      this.value.splice(i, 1);
    }
  }

  reorder(event: Event) {
    let detail = (<ItemReorderCustomEvent>event).detail;
    this.value = array_move(this.value, detail.from, detail.to);
    detail.complete(true);
  }

  edit(i: number, event?: Event) {
    this.activatedIndex = i;
    this.modal.present();
  }

  onWillDismiss(event) {
    this.activatedIndex = null;
  }

  cancel(event) {
    this.modal.dismiss();
  }

  update(item) {
    if (this.activatedIndex != null) {
      this.value[this.activatedIndex] = item;
    } else {
      this.value.push(item);
    }
    this.modal.dismiss();
  }

  add(event?: Event) {
    this.modal.present();
  }
}

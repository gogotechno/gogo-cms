import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CmsTranslable } from 'src/app/cms.type';
import { ScannerComponent } from './scanner/scanner.component';

@Component({
  selector: 'cms-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BarcodeScannerComponent),
      multi: true,
    },
  ],
})
export class BarcodeScannerComponent implements ControlValueAccessor {
  @Input('code') code: string;
  @Input('label') label: CmsTranslable;
  @Input('required') required: boolean;
  @Input('writable') writable: boolean;
  @Input('placeholder') placeholder: CmsTranslable;
  @Input('labelPosition') labelPosition: string;

  value: string;
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  get id() {
    return `cms-scan-${this.code}-lbl`;
  }

  constructor(private modalCtrl: ModalController) {}

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async openScanner() {
    const modal = await this.modalCtrl.create({
      component: ScannerComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.['value']) {
      let value = data['value'];
      this.writeValue(value);
      this.onChange(value);
    }
  }

  onInputChange(event?: Event) {
    let value = String(event);
    this.writeValue(value);
    this.onChange(value);
  }
}

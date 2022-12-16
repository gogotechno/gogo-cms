import { Component, forwardRef, Input, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputCustomEvent, IonInput } from '@ionic/angular';
import { CmsTranslable } from 'src/app/cms.type';

@Component({
  selector: 'cms-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PinInputComponent),
      multi: true,
    },
  ],
})
export class PinInputComponent implements ControlValueAccessor {
  @Input() digits = 6;
  @Input() code: string;
  @Input() label: CmsTranslable;
  @Input() required: boolean;
  @Input() labelPosition: string;

  @ViewChildren(IonInput) inputs: QueryList<IonInput>;

  get columns() {
    return new Array<number>(this.digits);
  }

  get lastIndex() {
    return this.digits - 1;
  }

  get pin() {
    const digits = this.inputs.map((input) => input.value);
    return digits.join('');
  }

  value: string;
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

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

  onInputFocus(index: number, event?: Event) {
    const value = this.inputs.get(index).value;
    if (value) {
      const inputs = this.inputs.filter((input) => !!input.value);
      inputs[inputs.length - 1].setFocus();
    } else {
      const inputs = this.inputs.filter((input) => !input.value);
      inputs[0].setFocus();
    }
  }

  onInputChange(index: number, event: Event) {
    const value = (<InputCustomEvent>event).detail.value;
    if (value) {
      const nextIndex = index < this.lastIndex ? index + 1 : this.lastIndex;
      this.inputs.get(nextIndex).setFocus();
    } else {
      const prevIndex = index > 0 ? index - 1 : 0;
      this.inputs.get(prevIndex).setFocus();
    }
    this.writeValue(this.pin);
    this.onChange(this.pin);
  }
}

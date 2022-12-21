import { Component, forwardRef, Input, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput } from '@ionic/angular';
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
    let inputs = this.inputs.filter((input) => !!input.value);
    if (inputs.length) {
      let first = inputs.length - 1;
      if (first < 0) {
        first = 0;
      }
      inputs[first].setFocus();
    } else {
      this.inputs.get(0).setFocus();
    }
  }

  onInputChange(index: number, event: Event) {
    let currentInput = this.inputs.get(index);
    let value = currentInput.value.toString();

    if (value && value.length > 1) {
      currentInput.value = value.charAt(0);
      let nextIndex = index + 1;
      let nextInput = this.inputs.get(nextIndex);
      nextInput.setFocus();
      nextInput.value = value.charAt(1);
    }

    if (!value) {
      let prevIndex = index > 0 ? index - 1 : 0;
      let prevInput = this.inputs.get(prevIndex);
      prevInput.setFocus();
    }

    this.writeValue(this.pin);
    this.onChange(this.pin);
  }

  getInputValue(index: number) {
    return this.inputs?.get(index).value;
  }
}

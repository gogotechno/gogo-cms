import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../wallets/wallets.types';

@Component({
  selector: 'jj-currency',
  templateUrl: './jj-currency.component.html',
  styleUrls: ['./jj-currency.component.scss'],
})
export class JJCurrencyComponent implements OnInit {
  @Input('currency') currency: Currency;
  @Input('value') value: number;
  @Input('showColor') showColor: boolean;

  numberFormat: string;

  get color() {
    if (!this.showColor) {
      return;
    }
    if (this.value < 0) {
      return 'danger';
    }
    return 'success';
  }

  constructor() {}

  ngOnInit() {
    if (!this.currency) {
      this.currency = {
        code: 'MYR',
        displaySymbol: 'RM',
        symbolPosition: 'START',
        precision: 2,
      };
    }
    this.numberFormat = `1.${this.currency.precision || '0'}-${this.currency.precision || '0'}`;
  }
}

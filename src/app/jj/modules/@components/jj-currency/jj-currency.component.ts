import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../wallets/wallets.types';

@Component({
  selector: 'jj-currency',
  templateUrl: './jj-currency.component.html',
  styleUrls: ['./jj-currency.component.scss'],
})
export class JJCurrencyComponent implements OnInit {
  @Input() currency: Currency;
  @Input() value: number;
  numberFormat: string;

  constructor() {}

  ngOnInit() {
    if (!this.currency) {
      this.currency = {
        code: 'MYR',
        displaySymbol: 'RM',
        precision: 2,
        symbolPosition: 'start',
      };
    }
    this.numberFormat = `1.${this.currency.precision || '0'}-${this.currency.precision || '0'}`;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesSummaryPage } from './sales-summary.page';
import { JjCurrencyModule } from 'src/app/jj/components/jj-currency/jj-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JjCurrencyModule,
  ],
  declarations: [SalesSummaryPage],
  exports: [SalesSummaryPage],
})
export class SalesSummaryPageModule {}

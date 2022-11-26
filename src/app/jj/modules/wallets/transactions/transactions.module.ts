import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { JjCurrencyModule } from 'src/app/jj/components/jj-currency/jj-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule,
    TranslateModule,
    ScrollingModule,
    JjCurrencyModule
  ],
  declarations: [TransactionsPage]
})
export class TransactionsPageModule {}

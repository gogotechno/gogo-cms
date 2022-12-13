import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferMoneyPageRoutingModule } from './transfer-money-routing.module';

import { TransferMoneyPage } from './transfer-money.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferMoneyPageRoutingModule
  ],
  declarations: [TransferMoneyPage]
})
export class TransferMoneyPageModule {}

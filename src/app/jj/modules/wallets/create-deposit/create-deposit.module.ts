import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDepositPageRoutingModule } from './create-deposit-routing.module';

import { CreateDepositPage } from './create-deposit.page';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDepositPageRoutingModule,
    SwsErpModule
  ],
  declarations: [CreateDepositPage]
})
export class CreateDepositPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawRequestPageRoutingModule } from './withdraw-request-routing.module';

import { WithdrawRequestPage } from './withdraw-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawRequestPageRoutingModule
  ],
  declarations: [WithdrawRequestPage]
})
export class WithdrawRequestPageModule {}

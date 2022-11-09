import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturePaymentPageRoutingModule } from './capture-payment-routing.module';

import { CapturePaymentPage } from './capture-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturePaymentPageRoutingModule
  ],
  declarations: [CapturePaymentPage]
})
export class CapturePaymentPageModule {}

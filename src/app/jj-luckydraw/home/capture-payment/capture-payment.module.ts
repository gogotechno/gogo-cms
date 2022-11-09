import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturePaymentPageRoutingModule } from './capture-payment-routing.module';

import { CapturePaymentPage } from './capture-payment.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturePaymentPageRoutingModule,
    CmsUIModule
  ],
  declarations: [CapturePaymentPage]
})
export class CapturePaymentPageModule {}

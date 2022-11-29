import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CapturePaymentComponent } from './capture-payment/capture-payment.component';

const components = [CapturePaymentComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, SharedModule, CmsUIModule, SwsErpModule],
  exports: components,
  declarations: components,
})
export class HomeComponentsModule {}

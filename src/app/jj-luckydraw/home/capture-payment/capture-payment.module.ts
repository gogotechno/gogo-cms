import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CapturePaymentPageRoutingModule } from './capture-payment-routing.module';
import { CapturePaymentPage } from './capture-payment.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { JJLuckydrawUiModule } from '../../jj-luckydraw-ui/jj-luckydraw-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturePaymentPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    JJLuckydrawUiModule,
    SwsErpModule
  ],
  declarations: [CapturePaymentPage]
})
export class CapturePaymentPageModule {}

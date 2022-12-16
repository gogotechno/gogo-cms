import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { LatestDrawComponent } from './latest-draw/latest-draw.component';
import { WalletCardComponent } from './wallet-card/wallet-card.component';
import { SmsComponent } from './sms/sms.component';

const components = [
  LatestDrawComponent,
  SmsComponent,
  WalletCardComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule
  ],
  exports: components,
})
export class JJLuckydrawUiModule {}

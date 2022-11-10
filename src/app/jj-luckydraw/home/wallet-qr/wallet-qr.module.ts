import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletQrPageRoutingModule } from './wallet-qr-routing.module';
import { WalletQrPage } from './wallet-qr.page';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { JJLuckydrawUiModule } from '../../jj-luckydraw-ui/jj-luckydraw-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletQrPageRoutingModule,
    QRCodeModule,
    TranslateModule,
    CmsUIModule,
    JJLuckydrawUiModule,
    SwsErpModule,
  ],
  declarations: [WalletQrPage],
})
export class WalletQrPageModule {}

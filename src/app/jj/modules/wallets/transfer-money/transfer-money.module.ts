import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransferMoneyPageRoutingModule } from './transfer-money-routing.module';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { WalletsComponentsModule } from '../@components/wallets-components.module';
import { TransferMoneyPage } from './transfer-money.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { ErpTranslationPipe } from 'src/app/sws-erp.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferMoneyPageRoutingModule,
    JJComponentsModule,
    WalletsComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [TransferMoneyPage],
  providers: [ErpTranslationPipe]
})
export class TransferMoneyPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletTransactionPageRoutingModule } from './wallet-transaction-routing.module';

import { WalletTransactionPage } from './wallet-transaction.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletTransactionPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [WalletTransactionPage]
})
export class WalletTransactionPageModule {}

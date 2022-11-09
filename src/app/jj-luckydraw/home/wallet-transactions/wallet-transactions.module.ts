import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletTransactionsPageRoutingModule } from './wallet-transactions-routing.module';
import { WalletTransactionsPage } from './wallet-transactions.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletTransactionsPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [WalletTransactionsPage]
})
export class WalletTransactionsPageModule {}

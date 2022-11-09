import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { MerchantWalletCardComponent } from './merchant-wallet-card/merchant-wallet-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TranslateModule,
    SwsErpModule,
    CmsUIModule
  ],
  declarations: [DashboardPage, MerchantWalletCardComponent]
})
export class DashboardPageModule { }

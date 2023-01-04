import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JJPageRoutingModule } from './jj-routing.module';
import { JJPage } from './jj.page';
import { SharedModule } from './shared';
import { SwsErpModule } from '../sws-erp.module';
import { CmsUIModule } from '../cms-ui/cms-ui.module';
import { AuthGuard, InitGuard, PublicGuard } from './guards';
import { WalletsService } from './modules/wallets/wallets.service';
import { HomeService as MemberHomeService } from './modules/membership/home/@services/home.service';
import { AuthService, CommonService, CoreService } from './services';
import { MerchantService } from './modules/merchant/merchant.service';
import { AuthDataService } from './services/auth-data.service';
import { FinanceService } from './modules/finance/finance.service';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    JJPageRoutingModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule
  ],
  declarations: [JJPage],
  providers: [
    AuthGuard,
    PublicGuard,
    InitGuard,
    AuthService,
    AuthDataService,
    CommonService,
    CoreService,
    FinanceService,
    WalletsService,
    MerchantService,
    MemberHomeService,
  ]
})
export class JJPageModule {}

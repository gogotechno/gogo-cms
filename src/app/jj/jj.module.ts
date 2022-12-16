import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JJPageRoutingModule } from './jj-routing.module';
import { JJPage } from './jj.page';
import { WalletsService } from './modules/wallets/wallets.service';
import { SharedModule } from './shared';
import { SwsErpModule } from '../sws-erp.module';
import { CmsUIModule } from '../cms-ui/cms-ui.module';

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
  providers: [WalletsService]
})
export class JJPageModule {}

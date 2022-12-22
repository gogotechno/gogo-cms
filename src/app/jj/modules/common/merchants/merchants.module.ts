import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MerchantsPageRoutingModule } from './merchants-routing.module';
import { MerchantsPage } from './merchants.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantsPageRoutingModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [MerchantsPage]
})
export class MerchantsPageModule {}

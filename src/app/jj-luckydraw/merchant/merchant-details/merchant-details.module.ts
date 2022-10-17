import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantDetailsPageRoutingModule } from './merchant-details-routing.module';

import { MerchantDetailsPage } from './merchant-details.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantDetailsPageRoutingModule,
    TranslateModule,
    SwsErpModule
  ],
  declarations: [MerchantDetailsPage]
})
export class MerchantDetailsPageModule {}

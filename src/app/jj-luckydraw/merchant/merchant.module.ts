import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantPageRoutingModule } from './merchant-routing.module';

import { MerchantPage } from './merchant.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantPageRoutingModule,
    TranslateModule,
  ],
  declarations: [MerchantPage]
})
export class MerchantPageModule {}

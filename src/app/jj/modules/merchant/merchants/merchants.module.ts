import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantsPageRoutingModule } from './merchants-routing.module';

import { MerchantsPage } from './merchants.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantsPageRoutingModule,
    TranslateModule,
  ],
  declarations: [MerchantsPage]
})
export class MerchantsPageModule {}

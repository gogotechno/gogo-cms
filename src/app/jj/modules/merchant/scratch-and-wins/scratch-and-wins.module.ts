import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchAndWinsPageRoutingModule } from './scratch-and-wins-routing.module';

import { ScratchAndWinsPage } from './scratch-and-wins.page';
import { MerchantComponentsModule } from "../@components/merchant-components.module";
import { TranslateModule } from '@ngx-translate/core';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchAndWinsPageRoutingModule,
    MerchantComponentsModule,
    TranslateModule,
    SwsErpModule,
  ],
  declarations: [ScratchAndWinsPage],
})
export class ScratchAndWinsPageModule {}

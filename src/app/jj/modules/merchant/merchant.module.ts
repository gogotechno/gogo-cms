import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MerchantPageRoutingModule } from './merchant-routing.module';
import { MerchantPage } from './merchant.page';
import { SharedModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantPageRoutingModule,
    SharedModule
  ],
  declarations: [MerchantPage]
})
export class MerchantPageModule {}

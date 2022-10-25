import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerPageRoutingModule } from './customer-routing.module';

import { CustomerPage } from './customer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerPageRoutingModule,
    TranslateModule
  ],
  declarations: [CustomerPage]
})
export class CustomerPageModule {}

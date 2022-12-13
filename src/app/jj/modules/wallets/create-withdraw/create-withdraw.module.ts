import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateWithdrawPageRoutingModule } from './create-withdraw-routing.module';

import { CreateWithdrawPage } from './create-withdraw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWithdrawPageRoutingModule
  ],
  declarations: [CreateWithdrawPage]
})
export class CreateWithdrawPageModule {}

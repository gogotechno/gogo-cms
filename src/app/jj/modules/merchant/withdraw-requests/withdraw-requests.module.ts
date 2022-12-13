import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawRequestsPageRoutingModule } from './withdraw-requests-routing.module';

import { WithdrawRequestsPage } from './withdraw-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawRequestsPageRoutingModule
  ],
  declarations: [WithdrawRequestsPage]
})
export class WithdrawRequestsPageModule {}

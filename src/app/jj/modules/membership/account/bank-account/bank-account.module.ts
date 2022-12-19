import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankAccountPageRoutingModule } from './bank-account-routing.module';

import { BankAccountPage } from './bank-account.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankAccountPageRoutingModule,
    SharedModule,
    CmsUIModule,
  ],
  declarations: [BankAccountPage]
})
export class BankAccountPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankAccountsPageRoutingModule } from './bank-accounts-routing.module';

import { BankAccountsPage } from './bank-accounts.page';

import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankAccountsPageRoutingModule,
    SharedModule
  ],
  declarations: [BankAccountsPage]
})
export class BankAccountsPageModule {}

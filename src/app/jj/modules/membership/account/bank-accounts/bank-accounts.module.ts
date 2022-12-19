import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankAccountsPageRoutingModule } from './bank-accounts-routing.module';

import { BankAccountsPage } from './bank-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankAccountsPageRoutingModule
  ],
  declarations: [BankAccountsPage]
})
export class BankAccountsPageModule {}

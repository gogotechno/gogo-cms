import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankAccountsPage } from './bank-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: BankAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankAccountsPageRoutingModule {}

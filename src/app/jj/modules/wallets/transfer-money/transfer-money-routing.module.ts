import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferMoneyPage } from './transfer-money.page';

const routes: Routes = [
  {
    path: '',
    component: TransferMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferMoneyPageRoutingModule {}

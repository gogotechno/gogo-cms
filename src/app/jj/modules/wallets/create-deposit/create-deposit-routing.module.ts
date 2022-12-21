import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDepositPage } from './create-deposit.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDepositPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDepositPageRoutingModule {}

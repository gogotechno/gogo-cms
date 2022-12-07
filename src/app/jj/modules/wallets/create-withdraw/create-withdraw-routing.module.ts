import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWithdrawPage } from './create-withdraw.page';

const routes: Routes = [
  {
    path: '',
    component: CreateWithdrawPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateWithdrawPageRoutingModule {}

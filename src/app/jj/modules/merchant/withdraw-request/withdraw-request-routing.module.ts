import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawRequestPage } from './withdraw-request.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawRequestPageRoutingModule {}

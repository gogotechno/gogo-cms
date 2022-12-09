import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawRequestsPage } from './withdraw-requests.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawRequestsPageRoutingModule {}

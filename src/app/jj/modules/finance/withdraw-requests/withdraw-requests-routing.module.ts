import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawRequestsPage } from './withdraw-requests.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawRequestsPage,
  },
  {
    path: ':refNo',
    loadChildren: () => import('./withdraw-request/withdraw-request.module').then((m) => m.WithdrawRequestPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawRequestsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawsPage } from './withdraws.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawsPage,
  },
  {
    path: ':refNo',
    loadChildren: () => import('./withdraw/withdraw.module').then((m) => m.WithdrawPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawsPageRoutingModule {}

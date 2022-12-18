import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancePage } from './finance.page';

const routes: Routes = [
  {
    path: '',
    component: FinancePage,
  },
  {
    path: 'deposit-requests',
    children: [
      {
        path: '',
        loadChildren: () => import('./deposit-requests/deposit-requests.module').then((m) => m.DepositRequestsPageModule),
      },
      {
        path: ':refNo',
        loadChildren: () => import('./deposit-request/deposit-request.module').then((m) => m.DepositRequestPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancePageRoutingModule {}

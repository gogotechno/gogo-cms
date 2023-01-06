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
    loadChildren: () => import('./deposit-requests/deposit-requests.module').then((m) => m.DepositRequestsPageModule),
  },
  {
    path: 'withdraw-requests',
    loadChildren: () => import('./withdraw-requests/withdraw-requests.module').then((m) => m.WithdrawRequestsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancePageRoutingModule {}

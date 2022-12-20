import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositRequestsPage } from './deposit-requests.page';

const routes: Routes = [
  {
    path: '',
    component: DepositRequestsPage,
  },
  {
    path: ':refNo',
    loadChildren: () => import('./deposit-request/deposit-request.module').then((m) => m.DepositRequestPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRequestsPageRoutingModule {}

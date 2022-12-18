import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositRequestsPage } from './deposit-requests.page';

const routes: Routes = [
  {
    path: '',
    component: DepositRequestsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRequestsPageRoutingModule {}

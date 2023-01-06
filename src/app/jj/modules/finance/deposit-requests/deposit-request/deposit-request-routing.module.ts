import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositRequestPage } from './deposit-request.page';

const routes: Routes = [
  {
    path: '',
    component: DepositRequestPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRequestPageRoutingModule {}

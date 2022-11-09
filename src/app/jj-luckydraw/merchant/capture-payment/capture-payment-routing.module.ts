import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturePaymentPage } from './capture-payment.page';

const routes: Routes = [
  {
    path: '',
    component: CapturePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturePaymentPageRoutingModule {}

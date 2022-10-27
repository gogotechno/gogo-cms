import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantDetailsPage } from './merchant-details.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantDetailsPageRoutingModule {}

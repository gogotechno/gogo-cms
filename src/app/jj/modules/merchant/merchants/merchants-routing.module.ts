import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantsPage } from './merchants.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantsPageRoutingModule {}

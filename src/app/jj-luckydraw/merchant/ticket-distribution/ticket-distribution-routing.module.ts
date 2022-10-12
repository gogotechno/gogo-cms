import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketDistributionPage } from './ticket-distribution.page';

const routes: Routes = [
  {
    path: '',
    component: TicketDistributionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketDistributionPageRoutingModule {}

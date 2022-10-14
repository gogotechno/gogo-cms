import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketDistributionsPage } from './ticket-distributions.page';

const routes: Routes = [
  {
    path: '',
    component: TicketDistributionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketDistributionsPageRoutingModule {}

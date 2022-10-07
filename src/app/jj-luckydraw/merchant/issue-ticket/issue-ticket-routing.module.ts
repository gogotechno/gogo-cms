import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueTicketPage } from './issue-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: IssueTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueTicketPageRoutingModule {}

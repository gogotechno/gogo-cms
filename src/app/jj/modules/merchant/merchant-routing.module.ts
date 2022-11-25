import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantPage } from './merchant.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'ticket-distributions',
        loadChildren: () => import('./ticket-distributions/ticket-distributions.module').then((m) => m.TicketDistributionsPageModule),
      },
      {
        path: 'issue-ticket',
        loadChildren: () => import('./issue-ticket/issue-ticket.module').then((m) => m.IssueTicketPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPageRoutingModule {}

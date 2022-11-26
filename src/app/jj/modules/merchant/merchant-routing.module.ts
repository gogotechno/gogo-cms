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
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersPageModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersPageModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'issue-ticket',
    loadChildren: () => import('./issue-ticket/issue-ticket.module').then((m) => m.IssueTicketPageModule),
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then((m) => m.CreateUserPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantPage } from './merchant.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsPageModule)
      },
      {
        path: 'issue-ticket',
        loadChildren: () => import('./issue-ticket/issue-ticket.module').then(m => m.IssueTicketPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'create-user',
        loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserPageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPageRoutingModule { }

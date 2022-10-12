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
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerPage } from './customer.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerPage,
    children: [
      {
        path: 'ticket-history',
        loadChildren: () => import('./ticket-history/ticket-history.module').then(m => m.TicketHistoryPageModule)
      },
      {
        path: 'rewards',
        loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPageRoutingModule {}

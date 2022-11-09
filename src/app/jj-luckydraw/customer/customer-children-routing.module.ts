import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ticket-history',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./ticket-detail/ticket-detail.module').then(m => m.TicketDetailPageModule)
      }
    ]
  },
  {
    path: 'rewards',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./reward/reward.module').then(m => m.RewardPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerChildrenRoutingModule { }

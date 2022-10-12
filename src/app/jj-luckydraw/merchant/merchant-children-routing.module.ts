import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tickets',
    children: [
      {
        path: 'ticket-distribution/:id',
        loadChildren: () => import('./ticket-distribution/ticket-distribution.module').then(m => m.TicketDistributionPageModule)
      }
    ]
  },
  {
    path: 'users',
    children: [
      {
        path: 'user/:id',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
      }
    ]
  },
  {
    path: 'issue-ticket',
    loadChildren: () => import('./issue-ticket/issue-ticket.module').then(m => m.IssueTicketPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantChildrenRoutingModule { }

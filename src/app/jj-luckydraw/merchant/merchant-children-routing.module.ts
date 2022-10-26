import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// prettier-ignore
const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: 'merchant-details',
        loadChildren: () => import('./merchant-details/merchant-details.module').then(m => m.MerchantDetailsPageModule)
      }
    ]
  },
  {
    path: 'ticket-distributions',
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
  },
  {
    path: 'customers',
    children: [
      {
        path: 'customer/:id',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantChildrenRoutingModule {}

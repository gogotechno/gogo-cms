import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'ticket-distributions',
    loadChildren: () => import('./ticket-distributions/ticket-distributions.module').then((m) => m.TicketDistributionsPageModule),
  },
  {
    path: 'wallet-transactions',
    loadChildren: () => import('./wallet-transactions/wallet-transactions.module').then((m) => m.WalletTransactionsPageModule),
  },
  {
    path: 'ended-events',
    loadChildren: () => import('./ended-events/ended-events.module').then((m) => m.EndedEventsPageModule),
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
    path: 'issue-ticket',
    loadChildren: () => import('./issue-ticket/issue-ticket.module').then((m) => m.IssueTicketPageModule),
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then((m) => m.CreateUserPageModule),
  },
 
  // {
  //   path: 'merchants',
  //   loadChildren: () => import('./merchants/merchants.module').then((m) => m.MerchantsPageModule),
  // },
  {
    path: 'create-event',
    loadChildren: () => import('./create-event/create-event.module').then((m) => m.CreateEventPageModule),
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        loadChildren: () => import('./events/events.module').then((m) => m.EventsPageModule),
      },
      {
        path: ':id',
        loadChildren: () => import('./events/event-details/event-details.module').then((m) => m.EventDetailsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPageRoutingModule {}

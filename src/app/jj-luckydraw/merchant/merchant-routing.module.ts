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
        path: 'ticket-distributions',
        loadChildren: () => import('./ticket-distributions/ticket-distributions.module').then(m => m.TicketDistributionsPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./wallet-transactions/wallet-transactions.module').then(m => m.WalletTransactionsPageModule)
      },
      {
        path: 'capture',
        loadChildren: () => import('./capture-payment/capture-payment.module').then(m => m.CapturePaymentPageModule)
      },
      {
        path: 'qr',
        loadChildren: () => import('./wallet-qr/wallet-qr.module').then(m => m.WalletQrPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantPageRoutingModule { }

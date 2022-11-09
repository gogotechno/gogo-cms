import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ended-events',
    children: [
      {
        path: '',
        loadChildren: () => import('./ended-events/ended-events.module').then((m) => m.EndedEventsPageModule),
      },
      {
        path: ':id',
        loadChildren: () => import('./event-details/event-details.module').then((m) => m.EventDetailsPageModule),
      },
    ],
  },
  {
    path: 'wallet',
    children: [
      {
        path: 'capture',
        loadChildren: () => import('./capture-payment/capture-payment.module').then((m) => m.CapturePaymentPageModule),
      },
      {
        path: 'qr',
        loadChildren: () => import('./wallet-qr/wallet-qr.module').then((m) => m.WalletQrPageModule),
      },
      {
        path: 'transactions',
        children: [
          {
            path: '',
            loadChildren: () => import('./wallet-transactions/wallet-transactions.module').then((m) => m.WalletTransactionsPageModule),
          },
          {
            path: ':id',
            loadChildren: () => import('./wallet-transaction/wallet-transaction.module').then((m) => m.WalletTransactionPageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeChildrenRoutingModule {}

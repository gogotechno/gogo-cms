import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletsPage } from './wallets.page';

const routes: Routes = [
  {
    path: '',
    component: WalletsPage,
  },
  {
    path: 'transfer-receipt/:refNo',
    loadChildren: () => import('./transfer-receipt/transfer-receipt.module').then((m) => m.TransferReceiptPageModule),
  },
  {
    path: ':walletNo',
    children: [
      {
        path: '',
        loadChildren: () => import('./wallet/wallet.module').then((m) => m.WalletPageModule),
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then((m) => m.TransactionsPageModule),
      },
      {
        path: 'create-deposit',
        loadChildren: () => import('./create-deposit/create-deposit.module').then((m) => m.CreateDepositPageModule),
      },
      {
        path: 'deposits',
        children: [
          {
            path: '',
            loadChildren: () => import('./deposits/deposits.module').then((m) => m.DepositsPageModule),
          },
          {
            path: ':refNo',
            loadChildren: () => import('./deposit/deposit.module').then((m) => m.DepositPageModule),
          },
        ],
      },
      {
        path: 'create-withdraw',
        loadChildren: () => import('./create-withdraw/create-withdraw.module').then((m) => m.CreateWithdrawPageModule),
      },
      {
        path: 'withdraws',
        children: [
          {
            path: '',
            loadChildren: () => import('./withdraws/withdraws.module').then((m) => m.WithdrawsPageModule),
          },
          {
            path: ':id',
            loadChildren: () => import('./withdraw/withdraw.module').then((m) => m.WithdrawPageModule),
          },
        ],
      },

      {
        path: 'create-transfer',
        loadChildren: () => import('./create-transfer/create-transfer.module').then((m) => m.CreateTransferPageModule),
      },
      {
        path: 'transfer-money/:toWalletNo',
        loadChildren: () => import('./transfer-money/transfer-money.module').then((m) => m.TransferMoneyPageModule),
      },
      {
        path: 'change-pin',
        loadChildren: () => import('./change-pin/change-pin.module').then((m) => m.ChangePinPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule {}

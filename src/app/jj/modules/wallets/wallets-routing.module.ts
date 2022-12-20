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
    loadChildren: () => import('./wallet/wallet.module').then((m) => m.WalletPageModule),
  },
  {
    path: ':walletNo/transactions',
    loadChildren: () => import('./transactions/transactions.module').then((m) => m.TransactionsPageModule),
  },
  {
    path: ':walletNo/create-deposit',
    loadChildren: () => import('./create-deposit/create-deposit.module').then((m) => m.CreateDepositPageModule),
  },
  {
    path: ':walletNo/deposits',
    loadChildren: () => import('./deposits/deposits.module').then((m) => m.DepositsPageModule),
  },
  {
    path: ':walletNo/create-withdraw',
    loadChildren: () => import('./create-withdraw/create-withdraw.module').then((m) => m.CreateWithdrawPageModule),
  },
  {
    path: ':walletNo/withdraws',
    loadChildren: () => import('./withdraws/withdraws.module').then((m) => m.WithdrawsPageModule),
  },
  {
    path: ':walletNo/create-transfer',
    loadChildren: () => import('./create-transfer/create-transfer.module').then((m) => m.CreateTransferPageModule),
  },
  {
    path: ':walletNo/transfer-money/:toWalletNo',
    loadChildren: () => import('./transfer-money/transfer-money.module').then((m) => m.TransferMoneyPageModule),
  },
  {
    path: ':walletNo/change-pin',
    loadChildren: () => import('./change-pin/change-pin.module').then((m) => m.ChangePinPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule {}

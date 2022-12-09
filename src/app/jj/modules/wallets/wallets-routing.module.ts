import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletsPage } from './wallets.page';

const routes: Routes = [
  {
    path: '',
    component: WalletsPage,
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then((m) => m.LocationsPageModule),
  },
  {
    path: 'create-deposit',
    loadChildren: () => import('./create-deposit/create-deposit.module').then((m) => m.CreateDepositPageModule),
  },
  {
    path: 'create-withdraw',
    loadChildren: () => import('./create-withdraw/create-withdraw.module').then((m) => m.CreateWithdrawPageModule),
  },
  {
    path: 'withdraws',
    loadChildren: () => import('./withdraws/withdraws.module').then((m) => m.WithdrawsPageModule),
  },
  {
    path: 'deposits',
    loadChildren: () => import('./deposits/deposits.module').then((m) => m.DepositsPageModule),
  },
  {
    path: 'deposit',
    loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawPageModule)
  },
  {
    path: ':walletNo',
    loadChildren: () => import('./wallet/wallet.module').then((m) => m.WalletPageModule),
  },
  {
    path: ':walletNo/transactions',
    loadChildren: () => import('./transactions/transactions.module').then((m) => m.TransactionsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule { }

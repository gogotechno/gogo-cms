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
    path: ':walletNo/create-withdraw',
    loadChildren: () => import('./create-withdraw/create-withdraw.module').then((m) => m.CreateWithdrawPageModule),
  },
  {
    path: ':walletNo/withdraws',
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
    path: ':walletNo/withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  },
  {  
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawPageModule)
  },
  {
    path: 'change-pin',
    loadChildren: () => import('./change-pin/change-pin.module').then( m => m.ChangePinPageModule)
  },
  {
    path: 'verify-pin',
    loadChildren: () => import('./verify-pin/verify-pin.module').then( m => m.VerifyPinPageModule)
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
    path: ':walletNo/search-phone',
    loadChildren: () => import('./search-phone/search-phone.module').then( m => m.SearchPhonePageModule)
  },
  {
    path: ':walletNo/transfer-money',
    loadChildren: () => import('./transfer-money/transfer-money.module').then( m => m.TransferMoneyPageModule)
  },
  {
    path: ':walletNo/transfers',
    loadChildren: () => import('./transfers/transfers.module').then( m => m.TransfersPageModule)
  },
  {
    path: ':walletNo/transfer',
    loadChildren: () => import('./transfer/transfer.module').then( m => m.TransferPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletQrPage } from './wallet-qr.page';

const routes: Routes = [
  {
    path: '',
    component: WalletQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletQrPageRoutingModule {}

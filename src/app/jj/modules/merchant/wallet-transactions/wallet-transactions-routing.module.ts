import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./list/list.module').then((m) => m.ListPageModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./details/details.module').then((m) => m.DetailsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletTransactionsPageRoutingModule {}

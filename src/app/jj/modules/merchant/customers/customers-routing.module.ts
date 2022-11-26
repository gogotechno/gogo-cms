import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersPage } from './customers.page';

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
export class CustomersPageRoutingModule {}

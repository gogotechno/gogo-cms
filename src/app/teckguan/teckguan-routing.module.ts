import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeckguanPage } from './teckguan.page';

const routes: Routes = [
  {
    path: '',
    component: TeckguanPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'fleet',
        loadChildren: () => import('./fleet/fleet.module').then( m => m.FleetPageModule)
      },
      {
        path: 'all-products',
        loadChildren: () => import('./all-products/all-products.module').then( m => m.AllProductsPageModule)
      },
      {
        path: 'my-account',
        loadChildren: () => import('./my-account/my-account.module').then( m => m.MyAccountPageModule)
      },
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeckguanPageRoutingModule {}

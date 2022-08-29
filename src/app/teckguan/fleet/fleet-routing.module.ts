import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FleetPage } from './fleet.page';

const routes: Routes = [
  {
    path: '',
    component: FleetPage,
    children: [
      {
        path: '',
        redirectTo: '/teckguan/fleet/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        // loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FleetPageRoutingModule {}

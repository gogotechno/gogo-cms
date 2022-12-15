import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'crm',
        loadChildren: () => import('./crm/crm.module').then(m => m.CrmPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./@layouts/report-layout/report-layout.module').then( m => m.ReportLayoutPageModule)
      },
      {
        path: 'modules',
        loadChildren: () => import('./@layouts/module-layout/module-layout.module').then( m => m.ModuleLayoutPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }

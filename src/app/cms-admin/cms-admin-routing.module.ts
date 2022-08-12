import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmsAdminPage } from './cms-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CmsAdminPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'databases',
        loadChildren: () => import('./databases/databases.module').then(m => m.DatabasesPageModule)
      },
      {
        path: 'databases/:table',
        loadChildren: () => import('./database-table/database-table.module').then(m => m.DatabaseTablePageModule)
      },
      {
        path: 'databases/:table/:document',
        loadChildren: () => import('./database-form/database-form.module').then(m => m.DatabaseFormPageModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsAdminPageRoutingModule { }

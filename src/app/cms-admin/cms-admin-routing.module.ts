import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

import { CmsAdminPage } from './cms-admin.page';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/cms-admin/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/cms-admin']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  {
    path: '',
    component: CmsAdminPage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
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
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsAdminPageRoutingModule { }

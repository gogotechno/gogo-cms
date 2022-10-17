import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, SignInGuard } from './jj-luckydraw.guards';

import { JJLuckydrawPage } from './jj-luckydraw.page';
import { MerchantPage } from './merchant/merchant.page';

const routes: Routes = [
  {
    path: '',
    component: JJLuckydrawPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'merchant',
        loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
      },
      {
        path: 'me',
        loadChildren: () => import('./me/me.module').then(m => m.MePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'sign-in',
    canActivate: [SignInGuard],
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home-children.module').then(m => m.HomeChildrenModule)
  },
  {
    path: 'merchant',
    canActivate: [AuthGuard],
    loadChildren: () => import('./merchant/merchant-children.module').then(m => m.MerchantChildrenModule)
  },
  {
    path: 'me',
    canActivate: [AuthGuard],
    loadChildren: () => import('./me/me-children.module').then(m => m.MeChildrenModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JJLuckydrawPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, SignInGuard } from './jj-luckydraw.guards';

import { JjLuckydrawPage } from './jj-luckydraw.page';

const routes: Routes = [
  {
    path: '',
    component: JjLuckydrawPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'merchant',
        loadChildren: () => import('./merchant/merchant.module').then( m => m.MerchantPageModule)
      },
      {
        path: 'me',
        loadChildren: () => import('./me/me.module').then( m => m.MePageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
      }
    ],
     canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule),
    canActivate: [SignInGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'merchant',
    loadChildren: () => import('./merchant/merchant.module').then( m => m.MerchantPageModule)
  },
  {
    path: 'me',
    loadChildren: () => import('./me/me.module').then( m => m.MePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JjLuckydrawPageRoutingModule {}

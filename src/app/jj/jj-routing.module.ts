import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, InitGuard } from './guards';
import { JJPage } from './jj.page';

const routes: Routes = [
  {
    path: '',
    component: JJPage,
    canActivate: [InitGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/membership/membership.module').then((m) => m.MembershipPageModule),
      },
      {
        path: 'rewards',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/rewards/rewards.module').then((m) => m.RewardsPageModule),
      },
      {
        path: 'wallets',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/wallets/wallets.module').then((m) => m.WalletsPageModule),
      },
      {
        path: 'merchant',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/merchant/merchant.module').then((m) => m.MerchantPageModule),
      },
      {
        path: 'common',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/common/common.module').then((m) => m.CommonPageModule),
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminPageModule),
      },
      {
        path: 'scratch-and-win',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/scratch-and-win/scratch-and-win.module').then((m) => m.ScratchAndWinPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JJPageRoutingModule { }

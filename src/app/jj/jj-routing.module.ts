import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitGuard } from './guards';
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
        loadChildren: () => import('./modules/rewards/rewards.module').then((m) => m.RewardsPageModule),
      },
      {
        path: 'wallets',
        loadChildren: () => import('./modules/wallets/wallets.module').then((m) => m.WalletsPageModule),
      },
      {
        path: 'merchant',
        loadChildren: () => import('./modules/merchant/merchant.module').then((m) => m.MerchantPageModule),
      },
      {
        path: 'common',
        loadChildren: () => import('./modules/common/common.module').then((m) => m.CommonPageModule),
      },
      {
        path: 'scratch-and-win',
        loadChildren: () => import('./modules/scratch-and-win/scratch-and-win.module').then((m) => m.ScratchAndWinPageModule),
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JJPageRoutingModule {}

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
        path: 'membership',
        loadChildren: () => import('./modules/membership/membership.module').then((m) => m.MembershipPageModule),
      },
      {
        path: 'rewards',
        loadChildren: () => import('./modules/rewards/rewards.module').then((m) => m.RewardsPageModule),
      },
      {
        path: 'wallets',
        loadChildren: () => import('./modules/wallets/wallets.module').then(m => m.WalletsPageModule)
      },
      {
        path: '',
        redirectTo: 'membership',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JJPageRoutingModule { }

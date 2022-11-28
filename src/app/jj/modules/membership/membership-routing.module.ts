import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, PublicGuard } from '../../guards';
import { MembershipPage } from './membership.page';

const routes: Routes = [
  {
    path: '',
    component: MembershipPage,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'login',
        canActivate: [PublicGuard],
        loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountPageModule),
      },
      {
        path: '',
        redirectTo: '/jj/',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipPageRoutingModule {}

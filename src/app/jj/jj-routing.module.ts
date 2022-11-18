import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JJPage } from './jj.page';

const routes: Routes = [
  {
    path: '',
    component: JJPage,
    children: [
      {
        path: 'membership',
        loadChildren: () => import('./modules/membership/membership.module').then((m) => m.MembershipPageModule),
      },
      {
        path: 'bonus',
        loadChildren: () => import('./modules/bonus/bonus.module').then((m) => m.BonusPageModule),
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
export class JJPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembershipPage } from './membership.page';

const routes: Routes = [
  {
    path: '',
    component: MembershipPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: '',
        redirectTo: 'home',
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

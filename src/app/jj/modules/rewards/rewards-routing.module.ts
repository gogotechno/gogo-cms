import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardsPage } from './rewards.page';

const routes: Routes = [
  {
    path: '',
    component: RewardsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'event-details',
        loadChildren: () => import('./event-details/event-details.module').then((m) => m.EventDetailsPageModule),
      },
      {
        path: 'my-rewards',
        loadChildren: () => import('./my-rewards/my-rewards.module').then((m) => m.MyRewardsPageModule),
      },
      {
        path: '',
        redirectTo: 'my-rewards',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardsPageRoutingModule {}

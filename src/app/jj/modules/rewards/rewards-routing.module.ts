import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then((m) => m.EventsPageModule),
  },
  {
    path: 'my-rewards',
    loadChildren: () => import('./my-rewards/my-rewards.module').then((m) => m.MyRewardsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardsPageRoutingModule {}

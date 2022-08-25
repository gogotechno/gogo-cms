import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TastefullyPage } from './tastefully.page';

const routes: Routes = [
  {
    path: '',
    component: TastefullyPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tastefully/home'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'me',
        loadChildren: () => import('./me/me.module').then( m => m.MePageModule)
      },
      {
        path: 'free-gift',
        loadChildren: () => import('./free-gift/free-gift.module').then( m => m.FreeGiftPageModule)
      },
      {
        path: 'shop',
        // loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
        loadChildren: () => import('./under-maintenance/under-maintenance.module').then( m => m.UnderMaintenancePageModule)
      },
      {
        path: 'lucky-draw',
        // loadChildren: () => import('./lucky-draw/lucky-draw.module').then( m => m.LuckyDrawPageModule)
        loadChildren: () => import('./under-maintenance/under-maintenance.module').then( m => m.UnderMaintenancePageModule)
      },
    ]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'events/:slug',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./event-list/event-list.module').then( m => m.EventListPageModule)
  },
  {
    path: 'feeds/:slug',
    loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'under-maintenance',
    loadChildren: () => import('./under-maintenance/under-maintenance.module').then( m => m.UnderMaintenancePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TastefullyPageRoutingModule {}

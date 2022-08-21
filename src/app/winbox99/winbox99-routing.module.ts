import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Winbox99Page } from './winbox99.page';

const routes: Routes = [
  {
    path: '',
    component: Winbox99Page,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'default-layout',
        loadChildren: () => import('./default-layout/default-layout.module').then( m => m.DefaultLayoutPageModule)
      },
      {
        path: 'promotions',
        data: { listCode: 'promotions' },
        loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'messages',
        data: { listCode: 'messages' },
        loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: ':page',
        loadChildren: () => import('./default-layout/default-layout.module').then( m => m.DefaultLayoutPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Winbox99PageRoutingModule { }

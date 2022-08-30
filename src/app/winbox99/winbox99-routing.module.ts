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
        path: 'faqs',
        loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsPageModule)
      },
      {
        path: 'list/:code',
        loadChildren: () => import('./default-list/default-list.module').then(m => m.DefaultListPageModule)
      },
      {
        path: ':page',
        loadChildren: () => import('./default-layout/default-layout.module').then(m => m.DefaultLayoutPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Winbox99PageRoutingModule { }

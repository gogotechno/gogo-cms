import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonPage } from './common.page';

const routes: Routes = [
  {
    path: '',
    component: CommonPage,
  },
  {
    path: 'content-page/:id',
    loadChildren: () => import('./content-page/content-page.module').then((m) => m.ContentPagePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonPageRoutingModule {}

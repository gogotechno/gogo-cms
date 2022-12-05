import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScratchAndWinPage } from './scratch-and-win.page';

const routes: Routes = [
  {
    path: ':id',
    component: ScratchAndWinPage,
  },
  {
    path: ':id/history',
    loadChildren: () => import('./scratch-history/scratch-history.module').then((m) => m.ScratchHistoryPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScratchAndWinPageRoutingModule {}

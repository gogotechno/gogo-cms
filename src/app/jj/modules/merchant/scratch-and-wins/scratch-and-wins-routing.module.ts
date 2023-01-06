import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScratchAndWinsPage } from './scratch-and-wins.page';

const routes: Routes = [
  {
    path: '',
    component: ScratchAndWinsPage,
  },
  {
    path: ':id',
    loadChildren: () => import('../scratch-and-wins/scratch-and-win-details/scratch-and-win-details.module').then((m) => m.ScratchAndWinDetailsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScratchAndWinsPageRoutingModule {}

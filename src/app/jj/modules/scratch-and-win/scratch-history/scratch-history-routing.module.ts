import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScratchHistoryPage } from './scratch-history.page';

const routes: Routes = [
  {
    path: '',
    component: ScratchHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScratchHistoryPageRoutingModule {}

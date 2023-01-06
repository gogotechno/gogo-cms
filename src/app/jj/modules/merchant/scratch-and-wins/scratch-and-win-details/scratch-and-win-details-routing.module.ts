import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScratchAndWinDetailsPage } from './scratch-and-win-details.page';

const routes: Routes = [
  {
    path: '',
    component: ScratchAndWinDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScratchAndWinDetailsPageRoutingModule {}

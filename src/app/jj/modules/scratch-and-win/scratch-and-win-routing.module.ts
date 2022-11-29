import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScratchAndWinPage } from './scratch-and-win.page';

const routes: Routes = [
  {
    path: '',
    component: ScratchAndWinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScratchAndWinPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateScratchAndWinPage } from './create-scratch-and-win.page';

const routes: Routes = [
  {
    path: '',
    component: CreateScratchAndWinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateScratchAndWinPageRoutingModule {}

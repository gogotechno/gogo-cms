import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMePage } from './update-me.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMePageRoutingModule {}

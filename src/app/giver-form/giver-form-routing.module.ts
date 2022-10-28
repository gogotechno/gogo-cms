import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiverFormPage } from './giver-form.page';

const routes: Routes = [
  {
    path: ':formCode',
    component: GiverFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiverFormPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutPage } from './default-layout.page';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultLayoutPageRoutingModule {}

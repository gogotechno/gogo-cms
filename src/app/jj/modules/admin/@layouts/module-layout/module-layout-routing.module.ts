import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleLayoutPage } from './module-layout.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleLayoutPage
  },
  {
    path: ':moduleCode',
    component: ModuleLayoutPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleLayoutPageRoutingModule {}

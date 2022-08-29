import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultListPage } from './default-list.page';

const routes: Routes = [
  {
    path: '',
    component: DefaultListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultListPageRoutingModule {}

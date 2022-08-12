import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabasesPage } from './databases.page';

const routes: Routes = [
  {
    path: '',
    component: DatabasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatabasesPageRoutingModule {}

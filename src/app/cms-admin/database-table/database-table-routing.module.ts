import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabaseTablePage } from './database-table.page';

const routes: Routes = [
  {
    path: '',
    component: DatabaseTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatabaseTablePageRoutingModule {}

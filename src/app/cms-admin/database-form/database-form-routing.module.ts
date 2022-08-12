import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatabaseFormPage } from './database-form.page';

const routes: Routes = [
  {
    path: '',
    component: DatabaseFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatabaseFormPageRoutingModule {}

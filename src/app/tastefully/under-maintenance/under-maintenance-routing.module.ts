import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnderMaintenancePage } from './under-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: UnderMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnderMaintenancePageRoutingModule {}

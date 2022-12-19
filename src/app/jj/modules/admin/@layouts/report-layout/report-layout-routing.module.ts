import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportLayoutPage } from './report-layout.page';

const routes: Routes = [
  {
    path: '',
    component: ReportLayoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportLayoutPageRoutingModule {}

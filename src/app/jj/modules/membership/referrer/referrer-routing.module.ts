import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferrerPage } from './referrer.page';

const routes: Routes = [
  {
    path: '',
    component: ReferrerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferrerPageRoutingModule {}

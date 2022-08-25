import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuckyDrawPage } from './lucky-draw.page';

const routes: Routes = [
  {
    path: '',
    component: LuckyDrawPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuckyDrawPageRoutingModule {}

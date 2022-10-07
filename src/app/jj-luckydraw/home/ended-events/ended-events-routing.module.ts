import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndedEventsPage } from './ended-events.page';

const routes: Routes = [
  {
    path: '',
    component: EndedEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndedEventsPageRoutingModule {}

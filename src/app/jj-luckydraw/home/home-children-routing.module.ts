import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ended-events',
    children: [
      {
        path: '',
        loadChildren: () => import('./ended-events/ended-events.module').then(m => m.EndedEventsPageModule)
      },
      {
        path: 'event-details/:id',
        loadChildren: () => import('./event-details/event-details.module').then(m => m.EventDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeChildrenRoutingModule { }

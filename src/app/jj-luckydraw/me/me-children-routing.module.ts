import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'update-me',
    loadChildren: () => import('./update-me/update-me.module').then(m => m.UpdateMePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeChildrenRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then((m) => m.EditProfilePageModule),
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-language',
    loadChildren: () => import('./change-language/change-language.module').then( m => m.ChangeLanguagePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}

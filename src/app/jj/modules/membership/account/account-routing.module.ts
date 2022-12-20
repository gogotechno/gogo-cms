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
    loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-language',
    loadChildren: () => import('./change-language/change-language.module').then(m => m.ChangeLanguagePageModule)
  },
  {
    path: 'bank-accounts',
    children: [
      {
        path: "",
        loadChildren: () => import('./bank-accounts/bank-accounts.module').then(m => m.BankAccountsPageModule)
      },
      {
        path: ":id",
        loadChildren: () => import('./bank-account/bank-account.module').then(m => m.BankAccountPageModule)
      },
      {
        path: ":id",
        loadChildren: () => import('./create-bank-account/create-bank-account.module').then(m => m.CreateBankAccountPageModule)
      }
    ]
  },
  {
    path: 'create-bank-account',
    loadChildren: () => import('./create-bank-account/create-bank-account.module').then(m => m.CreateBankAccountPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule { }

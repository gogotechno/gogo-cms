import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPhonePage } from './search-phone.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPhonePageRoutingModule {}

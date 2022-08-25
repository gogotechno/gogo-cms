import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeGiftPage } from './free-gift.page';

const routes: Routes = [
  {
    path: '',
    component: FreeGiftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeGiftPageRoutingModule {}

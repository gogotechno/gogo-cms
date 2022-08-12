import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmsAdminPageRoutingModule } from './cms-admin-routing.module';

import { CmsAdminPage } from './cms-admin.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CmsAdminPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CmsAdminPage]
})
export class CmsAdminPageModule {}

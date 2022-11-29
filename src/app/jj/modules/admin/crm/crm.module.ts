import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrmPageRoutingModule } from './crm-routing.module';

import { CrmPage } from './crm.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrmPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CrmPage]
})
export class CrmPageModule {}

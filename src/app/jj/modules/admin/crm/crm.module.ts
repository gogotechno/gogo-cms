import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrmPageRoutingModule } from './crm-routing.module';

import { CrmPage } from './crm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrmPageRoutingModule
  ],
  declarations: [CrmPage]
})
export class CrmPageModule {}

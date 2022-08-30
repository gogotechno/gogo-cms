import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnderMaintenancePageRoutingModule } from './under-maintenance-routing.module';

import { UnderMaintenancePage } from './under-maintenance.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnderMaintenancePageRoutingModule,
    TranslateModule,
  ],
  declarations: [UnderMaintenancePage]
})
export class UnderMaintenancePageModule {}

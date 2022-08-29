import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FleetPageRoutingModule } from './fleet-routing.module';

import { FleetPage } from './fleet.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FleetPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [FleetPage]
})
export class FleetPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TranslateModule } from '@ngx-translate/core';
import { VehicleBookingComponent } from './widgets/vehicle-booking/vehicle-booking.component';
import { VehicleApprovalComponent } from './widgets/vehicle-approval/vehicle-approval.component';
import { FuelConsumptionComponent } from './widgets/fuel-consumption/fuel-consumption.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    DashboardPage,
    VehicleBookingComponent,
    VehicleApprovalComponent,
    FuelConsumptionComponent,
  ]
})
export class DashboardPageModule { }

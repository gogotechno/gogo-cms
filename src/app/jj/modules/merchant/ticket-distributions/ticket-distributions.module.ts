import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDistributionsPageRoutingModule } from './ticket-distributions-routing.module';

import { TicketDistributionsPage } from './ticket-distributions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDistributionsPageRoutingModule
  ],
  declarations: [TicketDistributionsPage]
})
export class TicketDistributionsPageModule {}

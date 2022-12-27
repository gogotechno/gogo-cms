import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchAndWinDetailsPageRoutingModule } from './scratch-and-win-details-routing.module';

import { ScratchAndWinDetailsPage } from './scratch-and-win-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchAndWinDetailsPageRoutingModule
  ],
  declarations: [ScratchAndWinDetailsPage]
})
export class ScratchAndWinDetailsPageModule {}

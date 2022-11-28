import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchAndWinPageRoutingModule } from './scratch-and-win-routing.module';

import { ScratchAndWinPage } from './scratch-and-win.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchAndWinPageRoutingModule
  ],
  declarations: [ScratchAndWinPage]
})
export class ScratchAndWinPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateScratchAndWinPageRoutingModule } from './create-scratch-and-win-routing.module';

import { CreateScratchAndWinPage } from './create-scratch-and-win.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateScratchAndWinPageRoutingModule
  ],
  declarations: [CreateScratchAndWinPage]
})
export class CreateScratchAndWinPageModule {}

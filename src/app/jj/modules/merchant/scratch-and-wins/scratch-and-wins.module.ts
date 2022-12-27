import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchAndWinsPageRoutingModule } from './scratch-and-wins-routing.module';

import { ScratchAndWinsPage } from './scratch-and-wins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchAndWinsPageRoutingModule
  ],
  declarations: [ScratchAndWinsPage]
})
export class ScratchAndWinsPageModule {}

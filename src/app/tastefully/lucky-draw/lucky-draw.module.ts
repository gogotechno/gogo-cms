import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LuckyDrawPageRoutingModule } from './lucky-draw-routing.module';

import { LuckyDrawPage } from './lucky-draw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LuckyDrawPageRoutingModule
  ],
  declarations: [LuckyDrawPage]
})
export class LuckyDrawPageModule {}

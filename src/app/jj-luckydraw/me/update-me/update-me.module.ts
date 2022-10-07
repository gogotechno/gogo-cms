import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMePageRoutingModule } from './update-me-routing.module';

import { UpdateMePage } from './update-me.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMePageRoutingModule
  ],
  declarations: [UpdateMePage]
})
export class UpdateMePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonPageRoutingModule } from './common-routing.module';

import { CommonPage } from './common.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonPageRoutingModule
  ],
  declarations: [CommonPage]
})
export class CommonPageModule {}

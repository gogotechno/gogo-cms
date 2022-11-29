import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleLayoutPageRoutingModule } from './module-layout-routing.module';

import { ModuleLayoutPage } from './module-layout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleLayoutPageRoutingModule
  ],
  declarations: [ModuleLayoutPage]
})
export class ModuleLayoutPageModule {}

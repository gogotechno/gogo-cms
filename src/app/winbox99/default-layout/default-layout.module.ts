import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultLayoutPageRoutingModule } from './default-layout-routing.module';

import { DefaultLayoutPage } from './default-layout.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultLayoutPageRoutingModule,
    CmsUIModule
  ],
  declarations: [DefaultLayoutPage]
})
export class DefaultLayoutPageModule {}

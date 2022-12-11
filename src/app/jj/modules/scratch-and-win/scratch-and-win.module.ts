import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchAndWinPageRoutingModule } from './scratch-and-win-routing.module';

import { ScratchAndWinPage } from './scratch-and-win.page';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { SharedModule } from '../../shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchAndWinPageRoutingModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule
  ],
  declarations: [ScratchAndWinPage]
})
export class ScratchAndWinPageModule {}

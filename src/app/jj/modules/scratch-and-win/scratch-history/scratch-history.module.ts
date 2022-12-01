import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchHistoryPageRoutingModule } from './scratch-history-routing.module';

import { ScratchHistoryPage } from './scratch-history.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchHistoryPageRoutingModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule
  ],
  declarations: [ScratchHistoryPage]
})
export class ScratchHistoryPageModule {}
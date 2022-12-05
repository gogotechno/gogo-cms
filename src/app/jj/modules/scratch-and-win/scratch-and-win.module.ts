import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScratchAndWinPageRoutingModule } from './scratch-and-win-routing.module';
import { JJComponentsModule } from '../@components/jj-components.module';
import { ScratchAndWinComponentsModule } from './@components/scratch-and-win-components.module';
import { RewardsComponentsModule } from '../rewards/@components/rewards-components.module';
import { CommonComponentsModule } from '../common/@components/common-components.module';
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
    ScratchAndWinComponentsModule,
    RewardsComponentsModule,
    CommonComponentsModule,
    JJComponentsModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule
  ],
  declarations: [ScratchAndWinPage]
})
export class ScratchAndWinPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScratchAndWinDetailsPageRoutingModule } from './scratch-and-win-details-routing.module';

import { ScratchAndWinDetailsPage } from './scratch-and-win-details.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScratchAndWinDetailsPageRoutingModule,
    TranslateModule,
    SharedModule,
    CmsUIModule
  ],
  declarations: [ScratchAndWinDetailsPage]
})
export class ScratchAndWinDetailsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateScratchAndWinPageRoutingModule } from './create-scratch-and-win-routing.module';

import { CreateScratchAndWinPage } from './create-scratch-and-win.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateScratchAndWinPageRoutingModule,
    SharedModule,
    CmsUIModule,
  ],
  declarations: [CreateScratchAndWinPage]
})
export class CreateScratchAndWinPageModule {}

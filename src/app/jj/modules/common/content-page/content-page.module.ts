import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentPagePageRoutingModule } from './content-page-routing.module';

import { ContentPagePage } from './content-page.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPagePageRoutingModule,
    SharedModule,
    CmsUIModule
  ],
  declarations: [ContentPagePage]
})
export class ContentPagePageModule {}

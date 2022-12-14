import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMePageRoutingModule } from './update-me-routing.module';

import { UpdateMePage } from './update-me.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMePageRoutingModule,
    TranslateModule,
    CmsUIModule
  ],
  declarations: [UpdateMePage]
})
export class UpdateMePageModule {}

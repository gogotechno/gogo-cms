import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MePageRoutingModule } from './me-routing.module';

import { MePage } from './me.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MePageRoutingModule,
    CmsUIModule,
    TranslateModule.forChild(),
  ],
  declarations: [MePage]
})
export class MePageModule {}

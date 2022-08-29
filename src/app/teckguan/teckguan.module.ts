import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeckguanPageRoutingModule } from './teckguan-routing.module';

import { TeckguanPage } from './teckguan.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from '../cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeckguanPageRoutingModule,
    TranslateModule.forChild(),
    CmsUIModule,
  ],
  declarations: [TeckguanPage]
})
export class TeckguanPageModule {}

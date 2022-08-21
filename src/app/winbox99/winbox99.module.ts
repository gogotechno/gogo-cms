import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Winbox99PageRoutingModule } from './winbox99-routing.module';

import { Winbox99Page } from './winbox99.page';
import { Winbox99UiModule } from './winbox99-ui/winbox99-ui.module';
import { CmsUIModule } from '../cms-ui/cms-ui.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmsUIModule,
    Winbox99PageRoutingModule,
    Winbox99UiModule,
    TranslateModule,
  ],
  declarations: [Winbox99Page]
})
export class Winbox99PageModule { }

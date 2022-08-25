import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeGiftPageRoutingModule } from './free-gift-routing.module';

import { FreeGiftPage } from './free-gift.page';
import { CountdownModule } from 'ngx-countdown';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeGiftPageRoutingModule,
    CountdownModule,
    TranslateModule.forChild(),
    CmsUIModule
  ],
  declarations: [FreeGiftPage]
})
export class FreeGiftPageModule {}

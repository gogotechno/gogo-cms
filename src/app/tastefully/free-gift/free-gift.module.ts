import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeGiftPageRoutingModule } from './free-gift-routing.module';

import { FreeGiftPage } from './free-gift.page';
import { CountdownModule } from 'ngx-countdown';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeGiftPageRoutingModule,
    CountdownModule,
    TranslateModule,
    CmsUIModule
  ],
  declarations: [FreeGiftPage],
  providers: [CmsTranslatePipe]
})
export class FreeGiftPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TastefullyPageRoutingModule } from './tastefully-routing.module';

import { TastefullyPage } from './tastefully.page';
import { TranslateModule } from '@ngx-translate/core';
import { EventDetailPipe } from './event-detail.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TastefullyPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [TastefullyPage, EventDetailPipe]
})
export class TastefullyPageModule {}

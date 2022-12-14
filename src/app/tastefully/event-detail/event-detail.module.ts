import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailPageRoutingModule } from './event-detail-routing.module';

import { EventDetailPage } from './event-detail.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDetailPageRoutingModule,
    CmsUIModule,
    TranslateModule
  ],
  declarations: [EventDetailPage],
  providers: [DatePipe]
})
export class EventDetailPageModule { }

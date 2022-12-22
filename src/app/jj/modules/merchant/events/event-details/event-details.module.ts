import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailsPageRoutingModule } from './event-details-routing.module';

import { EventDetailsPage } from './event-details.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDetailsPageRoutingModule,
    TranslateModule,
    SharedModule,
    CmsUIModule
  ],
  declarations: [EventDetailsPage]
})
export class EventDetailsPageModule {}

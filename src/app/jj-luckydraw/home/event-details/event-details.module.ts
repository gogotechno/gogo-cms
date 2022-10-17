import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailsPageRoutingModule } from './event-details-routing.module';

import { EventDetailsPage } from './event-details.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { JJLuckydrawUiModule } from '../../jj-luckydraw-ui/jj-luckydraw-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDetailsPageRoutingModule,
    TranslateModule,
    JJLuckydrawUiModule
  ],
  declarations: [EventDetailsPage]
})
export class EventDetailsPageModule {}

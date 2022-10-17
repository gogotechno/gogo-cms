import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndedEventsPageRoutingModule } from './ended-events-routing.module';

import { EndedEventsPage } from './ended-events.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndedEventsPageRoutingModule,
    TranslateModule
  ],
  declarations: [EndedEventsPage]
})
export class EndedEventsPageModule {}

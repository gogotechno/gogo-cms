import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { MerchantComponentsModule } from '../@components/merchant-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    TranslateModule,
    SwsErpModule,
    MerchantComponentsModule,
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}

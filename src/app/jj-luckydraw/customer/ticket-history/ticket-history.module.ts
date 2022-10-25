import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketHistoryPageRoutingModule } from './ticket-history-routing.module';

import { TicketHistoryPage } from './ticket-history.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketHistoryPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [
    TicketHistoryPage,
    TicketFilterComponent
  ]
})
export class TicketHistoryPageModule {}

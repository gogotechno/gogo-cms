import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDetailPageRoutingModule } from './ticket-detail-routing.module';

import { TicketDetailPage } from './ticket-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDetailPageRoutingModule,
    TranslateModule,
    CmsUIModule
  ],
  declarations: [TicketDetailPage]
})
export class TicketDetailPageModule {}

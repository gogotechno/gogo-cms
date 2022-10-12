import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDistributionPageRoutingModule } from './ticket-distribution-routing.module';

import { TicketDistributionPage } from './ticket-distribution.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDistributionPageRoutingModule,
    TranslateModule,
    CmsUIModule
  ],
  declarations: [TicketDistributionPage]
})
export class TicketDistributionPageModule {}

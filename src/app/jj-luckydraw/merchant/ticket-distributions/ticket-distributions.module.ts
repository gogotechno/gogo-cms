import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDistributionsPageRoutingModule } from './ticket-distributions-routing.module';

import { TicketDistributionsPage } from './ticket-distributions.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { DistributionFilterComponent } from './distribution-filter/distribution-filter.component';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDistributionsPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [
    TicketDistributionsPage,
    DistributionFilterComponent
  ]
})
export class TicketDistributionsPageModule { }

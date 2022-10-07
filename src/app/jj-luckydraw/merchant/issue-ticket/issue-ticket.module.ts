import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueTicketPageRoutingModule } from './issue-ticket-routing.module';

import { IssueTicketPage } from './issue-ticket.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueTicketPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [IssueTicketPage]
})
export class IssueTicketPageModule {}

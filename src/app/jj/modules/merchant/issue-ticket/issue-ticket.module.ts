import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IssueTicketPageRoutingModule } from './issue-ticket-routing.module';
import { IssueTicketPage } from './issue-ticket.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { JJComponentsModule } from '../../@components/jj-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueTicketPageRoutingModule,
    SharedModule,
    CmsUIModule,
    JJComponentsModule,
  ],
  declarations: [IssueTicketPage],
})
export class IssueTicketPageModule {}

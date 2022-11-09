import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueTicketPageRoutingModule } from './issue-ticket-routing.module';

import { IssueTicketPage } from './issue-ticket.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { JJLuckydrawUiModule } from '../../jj-luckydraw-ui/jj-luckydraw-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueTicketPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    CmsUIModule,
    JJLuckydrawUiModule
  ],
  declarations: [IssueTicketPage]
})
export class IssueTicketPageModule {}

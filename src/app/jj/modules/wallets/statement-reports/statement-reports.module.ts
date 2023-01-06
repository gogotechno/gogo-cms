import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatementReportsPageRoutingModule } from './statement-reports-routing.module';

import { StatementReportsPage } from './statement-reports.page';
import { SharedModule } from 'src/app/jj/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatementReportsPageRoutingModule,
    SharedModule
  ],
  declarations: [StatementReportsPage]
})
export class StatementReportsPageModule {}

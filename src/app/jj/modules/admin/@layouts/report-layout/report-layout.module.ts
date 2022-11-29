import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportLayoutPageRoutingModule } from './report-layout-routing.module';

import { ReportLayoutPage } from './report-layout.page';
import { TranslateModule } from '@ngx-translate/core';
import { JjCurrencyModule } from 'src/app/jj/components/jj-currency/jj-currency.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportLayoutPageRoutingModule,
    TranslateModule,
    JjCurrencyModule,
  ],
  declarations: [ReportLayoutPage]
})
export class ReportLayoutPageModule {}

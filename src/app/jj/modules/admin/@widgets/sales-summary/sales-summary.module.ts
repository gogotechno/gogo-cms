import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesSummaryPage } from './sales-summary.page';
import { JJComponentsModule } from 'src/app/jj/modules/@components/jj-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JJComponentsModule,
  ],
  declarations: [SalesSummaryPage],
  exports: [SalesSummaryPage],
})
export class SalesSummaryPageModule {}

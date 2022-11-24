import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventCardComponent } from './event-card/event-card.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { LuckyDrawActivityComponent } from './lucky-draw-activity/lucky-draw-activity.component';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { RouterModule } from '@angular/router';

const components = [SummaryCardComponent, LuckyDrawActivityComponent, EventCardComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, SwsErpModule],
  exports: components,
  declarations: components,
})
export class HomeComponentsModule {}

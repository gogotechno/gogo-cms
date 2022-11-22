import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import {LuckyDrawActivityComponent} from './lucky-draw-activity/lucky-draw-activity.component'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [SummaryCardComponent,LuckyDrawActivityComponent],
  declarations: [SummaryCardComponent,LuckyDrawActivityComponent],
})
export class HomeComponentsModule {}

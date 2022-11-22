import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventCardComponent } from './event-card/event-card.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [SummaryCardComponent, EventCardComponent],
  declarations: [SummaryCardComponent, EventCardComponent],
})
export class HomeComponentsModule {}

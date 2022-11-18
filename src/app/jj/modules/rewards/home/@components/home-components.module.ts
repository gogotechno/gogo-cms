import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SummaryCardComponent } from './summary-card/summary-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [SummaryCardComponent],
  declarations: [SummaryCardComponent],
})
export class HomeComponentsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/jj/shared';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { DistributionSummaryComponent } from './distribution-summary/distribution-summary.component';

const components = [CountdownTimerComponent, DistributionSummaryComponent];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  exports: components,
  declarations: components,
})
export class RewardsComponentsModule {}

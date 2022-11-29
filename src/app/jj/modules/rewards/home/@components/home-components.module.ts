import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { RewardsComponentsModule } from '../../@components/rewards-components.module';
import { LuckyDrawCountdownComponent } from './lucky-draw-countdown/lucky-draw-countdown.component';
import { LuckyDrawsComponent } from './lucky-draws/lucky-draws.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { WinnersComponent } from './winners/winners.component';

const components = [LuckyDrawCountdownComponent, LuckyDrawsComponent, SummaryCardComponent, WinnersComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule,
    RewardsComponentsModule,
  ],
  exports: components,
  declarations: components,
})
export class HomeComponentsModule {}

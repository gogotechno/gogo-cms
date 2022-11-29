import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RewardsComponentsModule } from '../../../@components/rewards-components.module';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EventLocationComponent } from './event-location/event-location.component';
import { EventSummaryComponent } from './event-summary/event-summary.component';
import { GiftCodeComponent } from './gift-code/gift-code.component';
import { GiftLotteryComponent } from './gift-lottery/gift-lottery.component';
import { LuckyDrawRewardsComponent } from './lucky-draw-rewards/lucky-draw-rewards.component';
import { LuckyDrawResultComponent } from './lucky-draw-result/lucky-draw-result.component';
import { LuckyDrawPrizeComponent } from './lucky-draw-prize/lucky-draw-prize.component';

const components = [
  EventDescriptionComponent,
  EventLocationComponent,
  EventSummaryComponent,
  GiftCodeComponent,
  GiftLotteryComponent,
  LuckyDrawRewardsComponent,
  LuckyDrawResultComponent,
  LuckyDrawPrizeComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    RewardsComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  exports: components,
  declarations: components,
})
export class DetailsComponentsModule { }

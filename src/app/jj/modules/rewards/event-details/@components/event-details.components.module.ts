import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { EventCardSummaryComponent } from './event-card-summary/event-card-summary.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { EventLocationComponent } from './event-location/event-location.component';
import { GiftCodeComponent } from './gift-code/gift-code.component';
import { GiftLotteryComponent } from './gift-lottery/gift-lottery.component';
import { LuckyDrawRewardsComponent } from './lucky-draw-rewards/lucky-draw-rewards.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SwsErpModule],
  exports: [
    EventCardSummaryComponent, 
    EventDescriptionComponent, 
    EventLocationComponent, 
    GiftCodeComponent, 
    GiftLotteryComponent, 
    LuckyDrawRewardsComponent
],
  declarations: [
    EventCardSummaryComponent, 
    EventDescriptionComponent, 
    EventLocationComponent, 
    GiftCodeComponent, 
    GiftLotteryComponent, 
    LuckyDrawRewardsComponent
],
})
export class EventDetailsComponentsModule {}

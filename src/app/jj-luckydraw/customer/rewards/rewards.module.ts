import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardsPageRoutingModule } from './rewards-routing.module';

import { RewardsPage } from './rewards.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { RewardFilterComponent } from './reward-filter/reward-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardsPageRoutingModule,
    TranslateModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [
    RewardsPage,
    RewardFilterComponent
  ]
})
export class RewardsPageModule {}

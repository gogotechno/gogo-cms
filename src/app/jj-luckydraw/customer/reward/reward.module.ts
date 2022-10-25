import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardPageRoutingModule } from './reward-routing.module';

import { RewardPage } from './reward.page';
import { TranslateModule } from '@ngx-translate/core';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardPageRoutingModule,
    TranslateModule,
    CmsUIModule
  ],
  declarations: [RewardPage]
})
export class RewardPageModule {}

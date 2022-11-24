import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPageRoutingModule } from './details-routing.module';
import { DetailsPage } from './details.page';
import { DetailsComponentsModule } from './@components/details-components.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { RewardsComponentsModule } from '../../@components/rewards-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    DetailsComponentsModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule,
    RewardsComponentsModule,
  ],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}

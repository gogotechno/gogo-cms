import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailsPageRoutingModule } from './details-routing.module';
import { DetailsPage } from './details.page';
import { SharedModule } from 'src/app/jj/shared';
import { MyRewardsComponentsModule } from '../@components/my-rewards-components.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    SharedModule,
    MyRewardsComponentsModule,
    SwsErpModule,
    CmsUIModule,
  ],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}

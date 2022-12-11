import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { RewardsComponentsModule } from '../../rewards/@components/rewards-components.module';
import { HomeComponentsModule } from './@components/home-components.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    JJComponentsModule,
    RewardsComponentsModule,
    HomeComponentsModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}

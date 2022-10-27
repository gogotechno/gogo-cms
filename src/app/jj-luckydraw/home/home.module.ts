import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { JJLuckydrawUiModule } from '../jj-luckydraw-ui/jj-luckydraw-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule,
    SwsErpModule,
    JJLuckydrawUiModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

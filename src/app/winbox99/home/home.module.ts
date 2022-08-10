import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { Winbox99UiModule } from '../winbox99-ui/winbox99-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CmsUIModule,
    Winbox99UiModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

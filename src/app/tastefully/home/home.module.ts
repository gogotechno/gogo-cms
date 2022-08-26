import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { TastefullyUiModule } from '../tastefully-ui/tastefully-ui.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule.forChild(),
    CmsUIModule,
    TastefullyUiModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }

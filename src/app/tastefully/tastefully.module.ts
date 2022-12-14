import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TastefullyPageRoutingModule } from './tastefully-routing.module';

import { TastefullyPage } from './tastefully.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TastefullyPageRoutingModule,
    TranslateModule
  ],
  declarations: [TastefullyPage]
})
export class TastefullyPageModule { }

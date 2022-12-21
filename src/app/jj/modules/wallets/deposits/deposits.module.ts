import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositsPageRoutingModule } from './deposits-routing.module';

import { DepositsPage } from './deposits.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositsPageRoutingModule,
    TranslateModule
  ],
  declarations: [DepositsPage]
})
export class DepositsPageModule {}

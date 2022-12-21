import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePinPageRoutingModule } from './change-pin-routing.module';

import { ChangePinPage } from './change-pin.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePinPageRoutingModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [ChangePinPage]
})
export class ChangePinPageModule {}

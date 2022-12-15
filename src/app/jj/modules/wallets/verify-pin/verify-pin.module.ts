import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerifyPinPageRoutingModule } from './verify-pin-routing.module';
import { VerifyPinPage } from './verify-pin.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyPinPageRoutingModule,
    SharedModule,
    CmsUIModule
  ],
  declarations: [VerifyPinPage]
})
export class VerifyPinPageModule {}

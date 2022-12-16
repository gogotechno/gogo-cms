import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { FormsModule } from '@angular/forms';
import { VerifyPinComponent } from './verify-pin/verify-pin.component';
import { CreatePinComponent } from './create-pin/create-pin.component';

const components = [
  BankAccountComponent,
  VerifyPinComponent,
  CreatePinComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule
  ],
  exports: components
})
export class WalletsComponentsModule { }

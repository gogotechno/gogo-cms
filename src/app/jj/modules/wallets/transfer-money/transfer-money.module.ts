import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransferMoneyPageRoutingModule } from './transfer-money-routing.module';
import { TransferMoneyPage } from './transfer-money.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferMoneyPageRoutingModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule
  ],
  declarations: [TransferMoneyPage]
})
export class TransferMoneyPageModule {}

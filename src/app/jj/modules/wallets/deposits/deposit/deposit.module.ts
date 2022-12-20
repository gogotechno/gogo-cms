import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DepositPageRoutingModule } from './deposit-routing.module';
import { DepositComponentsModule } from './@components/deposit-components.module';
import { DepositPage } from './deposit.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { JJComponentsModule } from '../../../@components/jj-components.module';
import { WalletsComponentsModule } from '../../@components/wallets-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositPageRoutingModule,
    JJComponentsModule,
    WalletsComponentsModule,
    DepositComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [DepositPage],
})
export class DepositPageModule {}

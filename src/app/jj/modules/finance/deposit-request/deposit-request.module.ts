import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DepositRequestPageRoutingModule } from './deposit-request-routing.module';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { DepositRequestPage } from './deposit-request.page';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositRequestPageRoutingModule,
    JJComponentsModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule,
  ],
  declarations: [DepositRequestPage],
})
export class DepositRequestPageModule {}

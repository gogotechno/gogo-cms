import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WithdrawRequestPageRoutingModule } from './withdraw-request-routing.module';
import { WithdrawRequestComponentsModule } from './@components/withdraw-request-components.module';
import { JJComponentsModule } from '../../../@components/jj-components.module';
import { WithdrawRequestPage } from './withdraw-request.page';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawRequestPageRoutingModule,
    WithdrawRequestComponentsModule,
    JJComponentsModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule,
  ],
  declarations: [WithdrawRequestPage],
})
export class WithdrawRequestPageModule {}

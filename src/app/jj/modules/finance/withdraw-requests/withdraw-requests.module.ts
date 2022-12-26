import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WithdrawRequestsPageRoutingModule } from './withdraw-requests-routing.module';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { WithdrawRequestsComponentsModule } from './@components/withdraw-requests-components.module';
import { WithdrawRequestsPage } from './withdraw-requests.page';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawRequestsPageRoutingModule,
    JJComponentsModule,
    WithdrawRequestsComponentsModule,
    SharedModule,
    SwsErpModule,
    CmsUIModule,
  ],
  declarations: [WithdrawRequestsPage],
})
export class WithdrawRequestsPageModule {}

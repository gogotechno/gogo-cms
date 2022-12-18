import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DepositRequestsPageRoutingModule } from './deposit-requests-routing.module';
import { DepositRequestsComponentsModule } from './@components/deposit-requests-components.module';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { DepositRequestsPage } from './deposit-requests.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositRequestsPageRoutingModule,
    DepositRequestsComponentsModule,
    JJComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [DepositRequestsPage],
  providers: [DatePipe],
})
export class DepositRequestsPageModule {}

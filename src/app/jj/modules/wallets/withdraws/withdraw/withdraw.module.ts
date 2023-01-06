import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WithdrawPageRoutingModule } from './withdraw-routing.module';
import { JJComponentsModule } from '../../../@components/jj-components.module';
import { WithdrawPage } from './withdraw.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawPageRoutingModule,
    JJComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [WithdrawPage],
})
export class WithdrawPageModule {}

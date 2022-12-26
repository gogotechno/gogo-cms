import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WithdrawsPageRoutingModule } from './withdraws-routing.module';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { WithdrawsPage } from './withdraws.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawsPageRoutingModule,
    JJComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [WithdrawsPage],
})
export class WithdrawsPageModule {}

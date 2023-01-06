import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateWithdrawPageRoutingModule } from './create-withdraw-routing.module';
import { CreateWithdrawComponentsModule } from './@components/create-withdraw-components.module';
import { CreateWithdrawPage } from './create-withdraw.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWithdrawPageRoutingModule,
    CreateWithdrawComponentsModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [CreateWithdrawPage],
})
export class CreateWithdrawPageModule {}

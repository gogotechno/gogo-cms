import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateTransferPageRoutingModule } from './create-transfer-routing.module';
import { CreateTransferPage } from './create-transfer.page';
import { SharedModule } from 'src/app/jj/shared';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SwsErpModule } from 'src/app/sws-erp.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTransferPageRoutingModule,
    SharedModule,
    CmsUIModule,
    SwsErpModule,
  ],
  declarations: [CreateTransferPage],
})
export class CreateTransferPageModule {}

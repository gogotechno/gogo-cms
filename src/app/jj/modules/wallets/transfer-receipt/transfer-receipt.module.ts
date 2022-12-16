import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferReceiptPageRoutingModule } from './transfer-receipt-routing.module';

import { TransferReceiptPage } from './transfer-receipt.page';
import { TranslateModule } from '@ngx-translate/core';
import { JJComponentsModule } from '../../@components/jj-components.module';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferReceiptPageRoutingModule,
    TranslateModule,
    JJComponentsModule,
    CmsUIModule,
  ],
  declarations: [TransferReceiptPage]
})
export class TransferReceiptPageModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { UploadAttachmentsComponent } from './upload-attachments/upload-attachments.component';
import { WalletsComponentsModule } from 'src/app/jj/modules/wallets/@components/wallets-components.module';
import { JJComponentsModule } from 'src/app/jj/modules/@components/jj-components.module';

const components = [
  UploadAttachmentsComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    SharedModule, 
    CmsUIModule, 
    SwsErpModule, 
    WalletsComponentsModule,
    JJComponentsModule
  ],
  exports: components,
})
export class WithdrawRequestComponentsModule {}

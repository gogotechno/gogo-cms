import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CmsUIModule } from 'src/app/cms-ui/cms-ui.module';
import { JJComponentsModule } from 'src/app/jj/modules/@components/jj-components.module';
import { SharedModule } from 'src/app/jj/shared';
import { SwsErpModule } from 'src/app/sws-erp.module';
import { WalletsComponentsModule } from '../../../@components/wallets-components.module';
import { UploadAttachmentsComponent } from './upload-attachments/upload-attachments.component';

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
export class DepositComponentsModule {}

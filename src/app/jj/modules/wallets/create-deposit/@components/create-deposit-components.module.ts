import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/jj/shared';
import { WalletsComponentsModule } from '../../@components/wallets-components.module';
import { UploadAttachmentsComponent } from './upload-attachments/upload-attachments.component';

const components = [
  UploadAttachmentsComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    SharedModule,
    WalletsComponentsModule
  ],
  exports: components,
  declarations: components,
})
export class CreateDepositComponentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrCodePageRoutingModule } from './qr-code-routing.module';
import { QrCodePage } from './qr-code.page';
import { SharedModule } from 'src/app/jj/shared';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodePageRoutingModule,
    SharedModule,
    QRCodeModule,
  ],
  declarations: [QrCodePage]
})
export class QrCodePageModule {}

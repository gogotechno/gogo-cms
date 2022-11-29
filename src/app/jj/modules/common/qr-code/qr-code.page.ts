import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  title: string;
  qrData: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

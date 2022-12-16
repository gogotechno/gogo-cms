import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Html5Qrcode } from 'html5-qrcode';
import { Html5QrcodeError, Html5QrcodeResult } from 'html5-qrcode/esm/core';
import { AppUtils } from 'src/app/cms.util';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  html5QrCode: Html5Qrcode;
  cameraType: 'FRONT' | 'BACK' = 'BACK';

  constructor(private modalCtrl: ModalController, private app: AppUtils) {}

  async ngOnInit() {
    await this.startScan();
  }

  async ngOnDestroy() {
    await this.clearScan();
  }

  assertReaderEl() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const el = document.getElementById('reader');
        if (el) {
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
    });
  }

  async startScan() {
    await this.assertReaderEl();
    if (!this.html5QrCode) {
      this.html5QrCode = new Html5Qrcode('reader');
    }
    const facingMode = this.cameraType == 'BACK' ? 'environment' : 'user';
    await this.html5QrCode.start(
      {
        facingMode,
      },
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        console.log('Scan result: ', decodedResult);
        await this.modalCtrl.dismiss({
          value: decodedText,
        });
      },
      async (message: string, error: Html5QrcodeError) => {
        // console.error('Error while scanning: ', error);
        // await this.app.presentAlert(message, '_FAILED_TO_SCAN');
      },
    );
  }

  async clearScan() {
    await this.html5QrCode.stop();
    this.html5QrCode.clear();
  }

  async switchCamera() {
    if (this.html5QrCode?.isScanning) {
      await this.clearScan();
    }
    this.cameraType = this.cameraType == 'BACK' ? 'FRONT' : 'BACK';
    await this.startScan();
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

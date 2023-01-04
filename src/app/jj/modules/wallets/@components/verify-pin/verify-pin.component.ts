import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss'],
})
export class VerifyPinComponent implements OnInit {
  walletNo: string;
  form = form;

  constructor(private modalCtrl: ModalController, private core: CoreService) {}

  ngOnInit() {}

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }

  async onVerify(data: VerifyPinDto) {
    await this.core.createPinVerification({
      walletNo: this.walletNo,
      walletPin: data.pin,
    });
    await this.modalCtrl.dismiss({
      success: true,
      pin: data.pin,
    });
  }
}

const form: CmsForm = {
  code: 'verify-pin',
  labelPosition: 'stacked',
  submitButtonId: 'verify-pin-btn',
  autoValidate: true,
  items: [
    {
      code: 'pin',
      label: {
        en: 'PIN',
        zh: '密码',
        ms: 'PIN',
      },
      type: 'pin',
      required: true,
    },
  ],
};

interface VerifyPinDto {
  pin: string;
}

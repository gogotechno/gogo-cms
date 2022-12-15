import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.page.html',
  styleUrls: ['./verify-pin.page.scss'],
})
export class VerifyPinPage implements OnInit {
  walletNo: string;
  form = form;

  constructor(private modalCtrl: ModalController, private appUtils: AppUtils, private core: CoreService) {}

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
    });
  }
}

const form: CmsForm = {
  code: 'verify-pin',
  labelPosition: 'stacked',
  submitButtonText: '_CONFIRM',
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

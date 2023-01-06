import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss'],
})
export class CreatePinComponent implements OnInit {
  walletId: number;
  form = form;

  constructor(private modalCtrl: ModalController, private core: CoreService) {}

  ngOnInit() {}

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }

  async onCreate(data: CreatePinDto) {
    await this.core.updateWallet(this.walletId, {
      pin: data.pin,
    });
    await this.modalCtrl.dismiss({
      success: true,
      pin: data.pin,
    });
  }
}

const form: CmsForm = {
  code: 'create-pin',
  labelPosition: 'stacked',
  submitButtonId: 'create-pin-btn',
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
    {
      code: 'confirmPin',
      label: {
        en: 'Confirm PIN',
        zh: '确认密码',
        ms: 'Sahkan PIN',
      },
      type: 'pin',
      required: true,
      matchWith: ['pin'],
    },
  ],
};

interface CreatePinDto {
  pin: string;
  confirmPin: string;
}

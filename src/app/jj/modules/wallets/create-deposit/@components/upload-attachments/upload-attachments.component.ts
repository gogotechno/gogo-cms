import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFile, CmsForm } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';
import { JJBankAccount } from 'src/app/jj/typings';
import { Currency } from '../../../wallets.types';

@Component({
  selector: 'app-upload-attachments',
  templateUrl: './upload-attachments.component.html',
  styleUrls: ['./upload-attachments.component.scss'],
})
export class UploadAttachmentsComponent implements OnInit {
  walletNo: string;
  amount: number;
  bankAccount: JJBankAccount;
  displayCurrency: Currency;
  amountToPay: number;
  form = form;

  constructor(private modalCtrl: ModalController, private core: CoreService) {}

  async ngOnInit() {
    let result = await this.core.createCheckConversionRequest({
      walletNo: this.walletNo,
      amount: this.amount,
    });
    this.displayCurrency = this.core.convertToCurrency(result.defaultCurrency);
    this.amountToPay = result.amount;
    this.bankAccount = await this.core.getRandomBankAccount();
  }

  async onUpload(data: UploadDto) {
    await this.modalCtrl.dismiss({
      attachments: data.attachments,
    });
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

const form: CmsForm = {
  code: 'upload-deposit',
  labelPosition: 'stacked',
  submitButtonId: 'upload-deposit-btn',
  items: [
    {
      code: 'attachments',
      label: 'jj._ATTACHMENTS',
      type: 'files',
      required: true,
      maximum: 3,
      fileConfig: {
        multiple: true,
      },
    },
  ],
};

interface UploadDto {
  attachments: CmsFile[];
}

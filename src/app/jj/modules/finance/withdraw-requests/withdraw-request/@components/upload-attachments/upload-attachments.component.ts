import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFile, CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { JJBankAccount } from 'src/app/jj/typings';

@Component({
  selector: 'app-upload-attachments',
  templateUrl: './upload-attachments.component.html',
  styleUrls: ['./upload-attachments.component.scss'],
})
export class UploadAttachmentsComponent implements OnInit {
  form = form;
  withdrawId: number;
  bankAccount: JJBankAccount;

  constructor(private modalCtrl: ModalController, private appUtils: AppUtils, private core: CoreService) {}

  ngOnInit() {}

  async onUpload(data: UploadDto) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_MAKE_PAYMENT');
    if (!confirm) {
      return;
    }
    await this.modalCtrl.dismiss({
      attachments: data.attachments,
    });
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

const form: CmsForm = {
  code: 'upload-withdraw',
  labelPosition: 'stacked',
  submitButtonId: 'upload-withdraw-btn',
  items: [
    {
      code: 'attachments',
      label: {
        en: 'Attachments',
        zh: '附件',
        ms: '',
      },
      type: 'files',
      required: true,
      maximum: 3,
    },
  ],
};

interface UploadDto {
  attachments: CmsFile[];
}

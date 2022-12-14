import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFile, CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { JJWithdrawRequest } from 'src/app/jj/typings';

@Component({
  selector: 'app-upload-attachments',
  templateUrl: './upload-attachments.component.html',
  styleUrls: ['./upload-attachments.component.scss'],
})
export class UploadAttachmentsComponent implements OnInit {
  form = form;
  withdrawId: number;
  withdraw: JJWithdrawRequest;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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
  code: 'upload-withdraw',
  labelPosition: 'stacked',
  submitButtonId: 'upload-withdraw-btn',
  autoValidate: true,
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

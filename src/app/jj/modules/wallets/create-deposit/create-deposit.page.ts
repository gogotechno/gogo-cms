import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';
import { UploadAttachmentsComponent } from './@components/upload-attachments/upload-attachments.component';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.page.html',
  styleUrls: ['./create-deposit.page.scss'],
})
export class CreateDepositPage implements OnInit {
  walletNo: string;
  form = form;
  formValue: CreateDepositDto;

  constructor(private route: ActivatedRoute, private modalCtrl: ModalController, private core: CoreService) {}

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.walletNo = params.walletNo;
    await this.loadData();
  }

  async loadData() {
    const methods = await this.core.getDepositMethods();
    const methodField = this.form.items.find((item) => item.code == 'deposit_method_id');
    methodField.options = methods.map((method) => ({
      code: String(method.doc_id),
      label: method.name,
      disabled: !method.isActive,
    }));

    this.formValue = {
      walletNo: this.walletNo,
      amount: 1,
      deposit_method_id: null,
    };
  }

  async onNext(data: CreateDepositDto) {
    console.log(data);

    const modal = await this.modalCtrl.create({
      component: UploadAttachmentsComponent,
      componentProps: {},
    });

    await modal.present();
  }
}

const form: CmsForm = {
  code: 'create-deposit',
  labelPosition: 'stacked',
  submitButtonText: '_NEXT',
  autoValidate: true,
  items: [
    {
      code: 'walletNo',
      label: {
        en: 'Wallet No.',
        zh: '钱包账号',
        ms: 'No. Dompet',
      },
      type: 'text',
      required: true,
      readonly: true,
    },
    {
      code: 'amount',
      label: {
        en: 'Amount',
        zh: '金额',
        ms: 'Jumlah',
      },
      placeholder: '0.00',
      type: 'number',
      required: true,
    },
    {
      code: 'deposit_method_id',
      label: {
        en: 'Method',
        zh: '方式',
        ms: 'Kaedah',
      },
      type: 'radio',
      required: true,
      direction: 'vertical',
    },
  ],
};

interface CreateDepositDto {
  walletNo: string;
  amount: number;
  deposit_method_id: number;
}

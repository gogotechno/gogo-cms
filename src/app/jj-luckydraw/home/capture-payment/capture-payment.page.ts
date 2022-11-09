import { Component, OnInit } from '@angular/core';
import { CmsForm } from 'src/app/cms.type';

@Component({
  selector: 'app-capture-payment',
  templateUrl: './capture-payment.page.html',
  styleUrls: ['./capture-payment.page.scss'],
})
export class CapturePaymentPage implements OnInit {
  loaded: boolean;
  form = form;

  constructor() {}

  ngOnInit() {
    this.loaded = false;
    this.loaded = true;
  }
}

const form: CmsForm = {
  code: 'capture-payment',
  labelPosition: 'stacked',
  items: [
    {
      code: 'fromWallet',
      label: {
        en: 'Wallet Account',
        zh: '钱包账号',
      },
      type: 'barcode-scanner',
      required: true,
    },
    {
      code: 'toWallet',
      label: {
        en: '',
        zh: '',
      },
      type: 'text',
      required: true,
      hidden: true,
    },
    {
      code: 'amount',
      label: {
        en: 'Amount',
        zh: '金额',
      },
      type: 'number',
      required: true,
    },
    {
      code: 'description',
      label: {
        en: 'Description',
        zh: '详情',
      },
      type: 'text',
    },
    {
      code: 'reference1',
      label: {
        en: 'Reference 1',
        zh: '参考 1',
      },
      type: 'text',
    },
    {
      code: 'reference2',
      label: {
        en: 'Reference 2',
        zh: '参考 2',
      },
      type: 'text',
    },
    {
      code: 'reference3',
      label: {
        en: 'Reference 3',
        zh: '参考 3',
      },
      type: 'text',
    },
  ],
};

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.page.html',
  styleUrls: ['./create-transfer.page.scss'],
})
export class CreateTransferPage implements OnInit {
  walletNo: string;
  form = form;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appUtils: AppUtils,
    private core: CoreService,
  ) {}

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
  }

  async onNext(data: CreateTransferDto) {
    let wallet = await this.core.getWalletByNo(data.walletNo);
    if (!wallet) {
      await this.appUtils.presentAlert('jj._WALLET_NOT_FOUND');
      return;
    }
    await this.router.navigate(['../transfer-money', data.walletNo], {
      relativeTo: this.route,
      state: {
        wallet: wallet,
      },
    });
  }
}

const form: CmsForm = {
  code: 'create-transfer',
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
      type: 'barcode-scanner',
      required: true,
      writable: true,
    },
  ],
};

interface CreateTransferDto {
  walletNo: string;
}
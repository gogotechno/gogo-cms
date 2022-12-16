import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';
import { JJWallet } from 'src/app/jj/typings';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.page.html',
  styleUrls: ['./change-pin.page.scss'],
})
export class ChangePinPage implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  form = form;

  constructor(private route: ActivatedRoute, private router: Router, private core: CoreService) {}

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];

    this.wallet = await this.core.getWalletByNo(this.walletNo);
  }

  async onCreate(data: ChangePinDto) {
    await this.core.updateWallet(this.wallet.doc_id, { pin: data.pin });
    await this.router.navigate(['..'], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}

const form: CmsForm = {
  code: 'change-pin',
  labelPosition: 'stacked',
  submitButtonText: '_CONFIRM',
  submitButtonId: 'change-pin-btn',
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

interface ChangePinDto {
  pin: string;
  confirmPin: string;
}

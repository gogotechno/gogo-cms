import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { MerchantService } from '../merchant.service';
import { AuthService, CommonService, CoreService } from 'src/app/jj/services';
import { JJScratchAndWinEvent } from 'src/app/jj/typings';

@Component({
  selector: 'app-create-scratch-and-win',
  templateUrl: './create-scratch-and-win.page.html',
  styleUrls: ['./create-scratch-and-win.page.scss'],
})
export class CreateScratchAndWinPage implements OnInit {
  backButtonText: string;
  form: CmsForm;
  value: Partial<JJScratchAndWinEvent>;

  constructor(
    private router: Router,
    private appUtils: AppUtils,
    private auth: AuthService,
    private core: CoreService,
    private common: CommonService,
    private merchantService: MerchantService,
  ) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    this.form = await this.merchantService.getSnwEventForm();
    this.form.submitButtonId = 'create-snw-event-btn';
    let merchantId = await this.auth.findMyMerchantId();
    this.value = {
      merchant_id: merchantId,
      isActive: true,
      prizes: [],
    };
  }

  async onSubmit(data: JJScratchAndWinEvent) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_CREATE_EVENT');
    if (!confirm) {
      return;
    }
    await this.core.createScratchAndWinEvent(data);
    await this.appUtils.presentAlert('jj._EVENT_CREATED');
    await this.router.navigate(['/jj/merchant/scratch-and-wins'], {
      replaceUrl: true,
      queryParams: {
        refresh: true,
      },
    });
  }
}

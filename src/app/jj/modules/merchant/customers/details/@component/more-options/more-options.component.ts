import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJCustomer } from 'src/app/jj/typings';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss'],
})
export class MoreOptionsComponent implements OnInit {
  customerId: number;
  customer: JJCustomer;

  constructor(
    private popoverCtrl: PopoverController,
    private appUtils: AppUtils,
    private core: CoreService,
    private common: CommonService,
  ) {}

  ngOnInit() {}

  async onResetPassword() {
    await this.popoverCtrl.dismiss();
    const confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_RESET_PASSWORD');
    if (confirm) {
      const randomPassword = (Math.random() + 1).toString(18).substring(2, 10);
      await this.core.updateCustomer(this.customerId, {
        password: randomPassword,
      });
      await this.appUtils.presentAlert('jj._PASSWORD_UPDATED', '_SUCCESS');
      this.common.sendSms(this.customer.phone, 'CUSTOMER_RESET_PASSWORD', {
        phone: this.customer.phone,
        password: randomPassword,
      });
    }
  }
}

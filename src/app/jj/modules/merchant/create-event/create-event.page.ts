import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJEvent } from 'src/app/jj/typings';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  form: CmsForm;
  value: Partial<JJEvent>;

  constructor(
    private router: Router,
    private appUtils: AppUtils,
    private auth: AuthService,
    private core: CoreService,
    private merchantService: MerchantService,
  ) {}

  async ngOnInit() {
    this.form = await this.merchantService.getEventForm();
    this.form.submitButtonId = 'create-event-btn';
    let merchantId = await this.auth.findMyMerchantId();
    this.value = {
      merchant_id: merchantId,
      status: 'ACTIVE',
      prizes: [],
      pointRules: [],
      scratchAndWinRules: [],
      showEndDateCountdown: false,
      showNearestStore: false,
      showCustomerTickets: false,
    };
  }

  async onSubmit(data: JJEvent) {
    console.log(data);
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_CREATE_EVENT');
    if (!confirm) {
      return;
    }
    await this.core.createEvent(data);
    await this.appUtils.presentAlert('jj._EVENT_CREATED');
    await this.router.navigate(['/jj/merchant/events'], {
      replaceUrl: true,
      queryParams: {
        refresh: true,
      },
    });
  }
}

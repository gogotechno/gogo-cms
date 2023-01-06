import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CommonService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJScratchAndWinEvent } from 'src/app/jj/typings';
import { MerchantService } from '../../merchant.service';

@Component({
  selector: 'app-scratch-and-win-details',
  templateUrl: './scratch-and-win-details.page.html',
  styleUrls: ['./scratch-and-win-details.page.scss'],
})
export class ScratchAndWinDetailsPage extends SharedComponent implements OnInit {
  backButtonText: string;
  eventId: number;
  event: JJScratchAndWinEvent;
  form: CmsForm;

  constructor(
    private route: ActivatedRoute,
    private appUtils: AppUtils,
    private core: CoreService,
    private common: CommonService,
    private merchantService: MerchantService,
  ) {
    super();
  }

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    this.form = await this.merchantService.getSnwEventForm();
    this.form.submitButtonId = 'edit-snw-event-btn';
    const params = this.route.snapshot.params;
    this.eventId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.event = await this.core.getScratchAndWinEventById(this.eventId, {
      hasFk: true,
    });
  }

  async onSubmit(data: JJScratchAndWinEvent) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_UPDATE_EVENT');
    if (!confirm) {
      return;
    }
    await this.core.updateScratchAndWinEvent(this.eventId, data);
    await this.appUtils.presentAlert('jj._EVENT_UPDATED');
  }
}

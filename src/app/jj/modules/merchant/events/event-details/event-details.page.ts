import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';
import { MerchantService } from '../../merchant.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage extends SharedComponent implements OnInit {
  eventId: number;
  event: JJEvent;
  form: CmsForm;

  constructor(
    private route: ActivatedRoute,
    private core: CoreService,
    private appUtils: AppUtils,
    private merchantService: MerchantService,
  ) {
    super();
  }

  async ngOnInit() {
    this.form = await this.merchantService.getEventForm();
    this.form.submitButtonId = 'edit-event-btn';
    const params = this.route.snapshot.params;
    this.eventId = params['id'];
    await this.loadData();
  }

  async loadData() {
    this.event = await this.core.getEventById(this.eventId, {
      hasFk: true,
    });
  }

  async onSubmit(data: JJEvent) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_UPDATE_EVENT');
    if (!confirm) {
      return;
    }
    await this.core.updateEvent(this.eventId, data);
    await this.appUtils.presentAlert('jj._EVENT_UPDATED');
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  form: CmsForm;
  event: any;
  eventId: number;

  constructor(private route: ActivatedRoute, private app: AppUtils, private merchantService: MerchantService) { }

  ngOnInit() {
    this.form = this.merchantService.eventForm;
    const params = this.route.snapshot.params;
    this.eventId = params.id;
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CREATE_EVENTS');
    if (!confirm) {
      return;
    }
    console.log(data);
  }

}

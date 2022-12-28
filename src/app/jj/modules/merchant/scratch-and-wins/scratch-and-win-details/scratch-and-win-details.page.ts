import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJScratchAndWinEvent } from 'src/app/jj/typings';
import { MerchantService } from '../../merchant.service';

@Component({
  selector: 'app-scratch-and-win-details',
  templateUrl: './scratch-and-win-details.page.html',
  styleUrls: ['./scratch-and-win-details.page.scss'],
})
export class ScratchAndWinDetailsPage extends SharedComponent implements OnInit {
  scratchAndWinEventId: number;
  scratchAndWinEvent: JJScratchAndWinEvent;
  form: CmsForm;

  constructor(
    private route: ActivatedRoute,
    private core: CoreService,
    private app: AppUtils,
    private merchantService: MerchantService,
  ) {
    super();
  }

  async ngOnInit() {
    this.form = await this.merchantService.getSnwEventForm();
    const params = this.route.snapshot.params;
    this.scratchAndWinEventId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.scratchAndWinEvent = await this.core.getScratchAndWinEventById(this.scratchAndWinEventId);
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CREATE_EVENTS');
    if (!confirm) {
      return;
    }
    console.log(data);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-create-scratch-and-win',
  templateUrl: './create-scratch-and-win.page.html',
  styleUrls: ['./create-scratch-and-win.page.scss'],
})
export class CreateScratchAndWinPage implements OnInit {
  ScratchAndWinEventId: number;
  ScratchAndWinEvent: any;
  form: CmsForm;
  
  constructor(private route: ActivatedRoute, private app: AppUtils, private merchantService: MerchantService) {}

  async ngOnInit() {
    this.form = await this.merchantService.getSNWEventForm();
    const params = this.route.snapshot.params;
    this.ScratchAndWinEventId = params.id;
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CREATE_EVENTS');
    if (!confirm) {
      return;
    }
    console.log(data);
  }

}

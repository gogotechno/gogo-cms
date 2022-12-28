import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { MerchantService } from '../merchant.service';
import { CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-create-scratch-and-win',
  templateUrl: './create-scratch-and-win.page.html',
  styleUrls: ['./create-scratch-and-win.page.scss'],
})
export class CreateScratchAndWinPage implements OnInit {

  form: CmsForm;

  constructor(
    private route: ActivatedRoute,
    private app: AppUtils,
    private merchantService: MerchantService,
    private core: CoreService,
    private router: Router,
    private appUtils: AppUtils,
  ) { }

  async ngOnInit() {
    this.form = await this.merchantService.getSnwEventForm();
  }

  async onSubmit(data: any) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CREATE_EVENTS');
    if (!confirm) {
      return;
    }
    console.log(data);
    // let SNWevent: JJScratchAndWinEvent = {
    //   ...data, 
    // }
    // await this.core.createScratchEvent(SNWevent);
    // console.log(data);
    // // await this.core.updateBankAccount(this.accountId, data);
    // await this.appUtils.presentAlert('jj._EVENT_ADDED', '_SUCCESS');
    // await this.router.navigate(['/jj/merchant/scratch-and-wins'], {
    //   replaceUrl: true,
    //   queryParams: {
    //     refresh: true
    //   },
    // });
  }

}

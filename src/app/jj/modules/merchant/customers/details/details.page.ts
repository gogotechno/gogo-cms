import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService, CommonService, CoreService } from 'src/app/jj/services';
import { JJCustomer, JJUser } from 'src/app/jj/typings';
import { MoreOptionsComponent } from './@component/more-options/more-options.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  backButtonText: string;
  currentUser: JJUser;
  customerId: number;
  customer: JJCustomer;

  form: CmsForm;

  constructor(
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private appUtils: AppUtils,
    private auth: AuthService,
    private core: CoreService,
    private common: CommonService,
  ) {}

  async ngOnInit() {
    this.form = this.currentUser.role == 'SYSTEM_ADMIN' ? systemForm : merchantForm;
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.customerId = params.id;
    this.currentUser = <JJUser>this.auth.currentUser;
    await this.loadData();
  }

  async loadData() {
    this.customer = await this.core.getCustomerById(this.customerId);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onUpdateCustomer(customer: JJCustomer) {
    const confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_UPDATE_CUSTOMER');
    if (confirm) {
      await this.core.updateCustomer(this.customerId, customer);
      await this.appUtils.presentAlert('jj._CUSTOMER_UPDATED', '_SUCCESS');
    }
  }

  async openMoreOptions(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: MoreOptionsComponent,
      componentProps: {
        customerId: this.customerId,
        customer: this.customer,
      },
      event,
    });
    await popover.present();
  }
}

const merchantForm: CmsForm = {
  code: 'create-user',
  labelPosition: 'stacked',
  submitButtonText: '_UPDATE',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'firstName',
      label: {
        en: 'First Name',
        zh: '名字',
        ms: 'Nama Pertama',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'lastName',
      label: {
        en: 'Last Name',
        zh: '姓氏',
        ms: 'Nama Terakhir',
      },
      type: 'text',
      required: true,
    },
  ],
};

const systemForm: CmsForm = {
  code: 'create-user',
  labelPosition: 'stacked',
  submitButtonText: '_UPDATE',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'firstName',
      label: {
        en: 'First Name',
        zh: '名字',
        ms: 'Nama Pertama',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'lastName',
      label: {
        en: 'Last Name',
        zh: '姓氏',
        ms: 'Nama Terakhir',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'phone',
      label: {
        en: 'Phone Number',
        zh: '手机号码',
        ms: 'Nombor Telefon',
      },
      type: 'text',
      required: true,
    },
  ],
};

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { CmsUtils, AppUtils } from 'src/app/cms.util';
import { DocStatus } from 'src/app/sws-erp.type';
import { AuthService } from '../../auth.service';
import { SmsTemplateCode, SmsComponent } from '../../components/sms/sms.component';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJAppUserRole, JJCustomer, JJUserRole, UserRole } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  SmsTemplateCode = SmsTemplateCode;

  @ViewChild(FormComponent) cmsForm: FormComponent;
  @ViewChild(SmsComponent) smsComponent: SmsComponent;

  loaded: boolean;
  customerId: number;
  customer: JJCustomer;

  form: CmsForm;
  value: Partial<JJCustomer>;

  editing: boolean;

  role: string;

  get editable() {
    return this.customer?.doc_status == DocStatus.SUBMIT;
  }

  profilePicture: string;

  constructor(
    private route: ActivatedRoute,
    private app: AppUtils,
    private lucky: JJLuckydrawService,
    private auth: AuthService
  ) {
    this.lucky.customerChange.subscribe((ev) => {
      if (ev?.beUpdated) {
        this.loadData();
      }
    });
  }

  async ngOnInit() {
    const me = await this.auth.findMe();
    this.role = me.role;
    let params = this.route.snapshot.params;
    this.customerId = params.id;
    this.lucky.customerChange.next({
      currentCustomerId: this.customerId,
    });
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.editing = false;
    this.customer = await this.lucky.getCustomerById(this.customerId);
    this.form = this.role == UserRole.MERCHANT_ADMIN? formWithoutPhone: form;
    await this.initForm();
    this.initValue();
    this.loaded = true;
    this.disableForm();
  }

  async enableForm() {
    await this.assertForm()
      .then(() => {
        this.cmsForm.markAsEditable();
        this.cmsForm.markAsSubmitable();
        this.editing = true;
      })
      .catch((err) => console.error(err));
  }

  async disableForm() {
    await this.assertForm()
      .then(() => {
        this.cmsForm.markAsNonEditable();
        this.cmsForm.markAsNonSubmitable();
        this.editing = false;
      })
      .catch((err) => console.error(err));
  }

  assertForm() {
    return new Promise<boolean>((resolve, reject) => {
      let cycle = 100;
      let timeout = 0;
      let interval = setInterval(() => {
        if (timeout > 3000) {
          clearInterval(interval);
          reject('Assert form error: Timeout due to no response');
          return;
        }
        if (this.cmsForm) {
          clearInterval(interval);
          resolve(true);
          return;
        }
        timeout += cycle;
      }, cycle);
    });
  }

  async initForm() {}

  initValue() {
    this.value = {
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      phone: this.customer.phone,
    };
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onUpdateCustomer(customer: JJCustomer) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    let confirm = await this.app.presentConfirm('jj-luckydraw._CONFIRM_TO_UPDATE_CUSTOMER');
    if (confirm) {
      await this.lucky.updateCustomer(this.customerId, this.cmsForm.removeUnusedKeys('swserp', customer));
      await this.app.presentAlert('jj-luckydraw._CUSTOMER_UPDATED', '_SUCCESS');
      this.disableForm();
    }
  }

  onEdit() {
    if (this.editing) {
      this.disableForm();
      return;
    }
    this.enableForm();
  }

  async onResetPassword() {
    let confirm = await this.app.presentConfirm('jj-luckydraw._CONFIRM_TO_RESET_PASSWORD');
    if (confirm) {
      const randomPassword = (Math.random() + 1).toString(18).substring(2, 10);
      const phone = `${this.customer.phone}`;
      await this.lucky.updateCustomer(this.customerId, { password: randomPassword });
      this.smsComponent._body = { phone: phone, password: randomPassword };
      await this.app.presentAlert('jj-luckydraw._CUSTOMER_UPDATED', '_SUCCESS');
      this.disableForm();
      this.smsComponent.send();
    }
  }
}

const formWithoutPhone: CmsForm = {
  code: 'create-user',
  submitButtonText: '_UPDATE',
  items: [
    {
      code: 'firstName',
      label: {
        en: 'First Name',
        zh: '名字',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
    },
    {
      code: 'lastName',
      label: {
        en: 'Last Name',
        zh: '姓氏',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
    }
  ],
};

const form: CmsForm = {
  code: 'create-user',
  submitButtonText: '_UPDATE',
  items: [
    {
      code: 'firstName',
      label: {
        en: 'First Name',
        zh: '名字',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
    },
    {
      code: 'lastName',
      label: {
        en: 'Last Name',
        zh: '姓氏',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
    },
    {
      code: 'phone',
      label: {
        en: 'Phone Number',
        zh: '手机号码',
      },
      labelPosition: 'stacked',
      type: 'text',
      required: true,
    }
  ],
};
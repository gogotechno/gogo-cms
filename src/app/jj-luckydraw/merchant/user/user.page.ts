import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm, CmsFormItemOptions } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJUser } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;
  userId: number;
  user: JJUser;

  form: CmsForm;
  value: Partial<JJUser>;

  constructor(private route: ActivatedRoute, private utils: CmsUtils, private app: AppUtils, private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.userId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.user = await this.lucky.getUserById(this.userId);
    this.form = form;
    await this.initForm();
    this.initValue();
    this.loaded = true;

    this.disableForm();
  }

  disableForm() {
    this.assertForm().then(() => {
      this.cmsForm.markAsReadonly();
      this.cmsForm.markAsNonSubmitable();
    }).catch((err) => console.error(err));
  }

  assertForm() {
    return new Promise<boolean>((resolve, reject) => {
      let cycle = 100;
      let timeout = 0;
      let interval = setInterval(() => {
        if (timeout > 3000) {
          clearInterval(interval);
          reject("Assert form error: Timeout due to no response");
          return;
        }
        if (this.cmsForm) {
          clearInterval(interval);
          resolve(true);
          return;
        }
        timeout += cycle;
      }, cycle);
    })
  }

  async initForm() {
    let roles = await this.lucky.getUserRolesByMerchant();
    let roleField = this.form.items.find((item) => item.code == "role");
    roleField.options = roles.map((role) => {
      let item: CmsFormItemOptions = {
        code: role.code,
        label: this.utils.transformJSONStringtoCMSTranslation(role.name)
      }
      return item;
    })
  }

  initValue() {
    this.value = {
      merchant_id: this.user.merchant_id,
      role: this.user.role,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    }
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onUpdateUser(user: JJUser) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    let confirm = await this.app.presentConfirm("jj-luckydraw._CONFIRM_TO_UPDATE_USER");
    if (confirm) {
      await this.lucky.updateUser(this.userId, this.cmsForm.removeUnusedKeys("swserp", user));
      await this.app.presentAlert("jj-luckydraw._USER_UPDATED", "_SUCCESS");
      this.disableForm();
    }
  }

  onEdit() {
    this.cmsForm.markAsEditable();
    this.cmsForm.markAsSubmitable();
  }

}

const form: CmsForm = {
  code: "create-user",
  submitButtonText: "_UPDATE",
  items: [
    {
      code: "merchant_id",
      label: {
        en: "Merchant",
        zh: "商家"
      },
      type: "number",
      required: true,
      hidden: true
    },
    {
      code: "role",
      label: {
        en: "Role",
        zh: "角色"
      },
      labelPosition: "stacked",
      type: "select",
      required: true
    },
    {
      code: "firstName",
      label: {
        en: "First Name",
        zh: "名字"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    },
    {
      code: "lastName",
      label: {
        en: "Last Name",
        zh: "姓氏"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    },
    {
      code: "email",
      label: {
        en: "Email",
        zh: "电子邮件"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    }
  ]
}

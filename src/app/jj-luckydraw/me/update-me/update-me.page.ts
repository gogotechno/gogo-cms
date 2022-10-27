import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJAppUserRole, JJCustomer, JJUser } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-update-me',
  templateUrl: './update-me.page.html',
  styleUrls: ['./update-me.page.scss'],
})
export class UpdateMePage implements OnInit {

  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;

  form: CmsForm;
  value: Partial<JJUser> | Partial<JJCustomer>;

  me: JJUser | JJCustomer;
  role: JJAppUserRole;

  constructor(private app: AppUtils, private auth: AuthService) { }

  async ngOnInit() {
    this.loaded = false;
    this.role = this.auth.userRole;
    this.form = this.role == JJAppUserRole.MERCHANT? userForm: customerForm;
    this.me = await this.auth.findMe();
    this.initValue();
    this.loaded = true;
  }

  initValue() {
    switch(this.role){
      case JJAppUserRole.MERCHANT:
        this.value = {
          firstName: this.me.firstName,
          lastName: this.me.lastName,
          email: this.me.email
        }
        break;
      case JJAppUserRole.CUSTOMER:
        this.value = {
          firstName: this.me.firstName,
          lastName: this.me.lastName,
          phone: this.me.phone
        }
        break;
    }

  }

  async onUpdateMe(user?: Partial<JJUser>| Partial<JJCustomer>) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    let confirm = await this.app.presentConfirm("jj-luckydraw._CONFIRM_TO_UPDATE_PROFILE");
    if (confirm) {
      await this.auth.updateMyProfile(this.cmsForm.removeUnusedKeys("swserp", user));
      await this.app.presentAlert("jj-luckydraw._PROFILE_UPDATED", "_SUCCESS");
    }
  }

}

const userForm: CmsForm = {
  code: "update-me",
  submitButtonText: "_UPDATE",
  items: [
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

const customerForm: CmsForm = {
  code: "update-me",
  submitButtonText: "_UPDATE",
  items: [
    {
      code: "firstName",
      label: {
        en: "First Name",
        zh: "名字"
      },
      labelPosition: "stacked",
      type: "text",
    },
    {
      code: "lastName",
      label: {
        en: "Last Name",
        zh: "姓氏"
      },
      labelPosition: "stacked",
      type: "text",
    },
    {
      code: "phone",
      label: {
        en: "Phone Number",
        zh: "手机号码"
      },
      labelPosition: "stacked",
      type: "text",
      required: true
    }
  ]
}

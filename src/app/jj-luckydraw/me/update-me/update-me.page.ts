import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJUser } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-update-me',
  templateUrl: './update-me.page.html',
  styleUrls: ['./update-me.page.scss'],
})
export class UpdateMePage implements OnInit {

  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;

  form: CmsForm;
  value: Partial<JJUser>;

  me: JJUser;

  constructor(private app: AppUtils, private auth: AuthService) { }

  async ngOnInit() {
    this.loaded = false;
    this.form = form;
    this.me = await this.auth.findMe();
    this.initValue();
    this.loaded = true;
  }

  initValue() {
    this.value = {
      firstName: this.me.firstName,
      lastName: this.me.lastName,
      email: this.me.email
    }
  }

  async onUpdateMe(user?: Partial<JJUser>) {
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

const form: CmsForm = {
  code: "update-me",
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

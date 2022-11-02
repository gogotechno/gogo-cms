import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from '../../auth.service';
import { JJUser } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;

  form: CmsForm;

  constructor(private app: AppUtils, private auth: AuthService) { }

  ngOnInit() {
    this.loaded = false;
    this.form = form;
    this.loaded = true;
  }

  async onChangePassword(user: Partial<JJUser>) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    let confirm = await this.app.presentConfirm("jj-luckydraw._CONFIRM_TO_CHANGE_PASSWORD");
    if (confirm) {
      await this.auth.updateMyPassword(user.old_password, user.new_password);
      await this.app.presentAlert("jj-luckydraw._PASSWORD_UPDATED", "_SUCCESS");
    }
  }

}

const form: CmsForm = {
  code: "change-password",
  submitButtonText: "_UPDATE",
  labelPosition: 'stacked',
  items: [
    {
      code: "old_password",
      label: {
        en: "Old Password",
        zh: "旧密码"
      },
      labelPosition: "stacked",
      type: "password",
      required: true
    },
    {
      code: "new_password",
      label: {
        en: "New Password",
        zh: "新密码"
      },
      labelPosition: "stacked",
      type: "password",
      required: true
    },
    {
      code: "confirm_password",
      label: {
        en: "Confirm Password",
        zh: "确认密码"
      },
      labelPosition: "stacked",
      type: "password",
      required: true,
      matchWith: ["new_password"]
    }
  ]
}

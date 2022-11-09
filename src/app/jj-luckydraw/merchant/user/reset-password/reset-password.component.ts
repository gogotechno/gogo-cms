import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJUser } from 'src/app/jj-luckydraw/jj-luckydraw.type';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild(FormComponent) cmsForm: FormComponent;

  userId: number;

  form: CmsForm;

  constructor(private app: AppUtils, private lucky: JJLuckydrawService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.form = form;
  }

  async onResetPassword(user: Partial<JJUser>) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    let confirm = await this.app.presentConfirm('jj-luckydraw._CONFIRM_TO_RESET_PASSWORD');
    if (confirm) {
      await this.lucky.updateUser(this.userId, { password: user.new_password });
      await this.app.presentAlert('jj-luckydraw._PASSWORD_RESET', '_SUCCESS');
    }
  }
}

const form: CmsForm = {
  code: 'reset-password',
  submitButtonText: '_RESET',
  items: [
    {
      code: 'new_password',
      label: {
        en: 'New Password',
        zh: '新密码',
      },
      type: 'password',
      required: true,
    },
    {
      code: 'confirm_password',
      label: {
        en: 'Confirm Password',
        zh: '确认密码',
      },
      type: 'password',
      required: true,
      matchWith: ['new_password'],
    },
  ],
};

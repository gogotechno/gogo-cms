import { Component, OnInit } from '@angular/core';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from 'src/app/jj/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  form = form;

  constructor(private app: AppUtils, private auth: AuthService) {}

  ngOnInit() {}

  async onSubmit(data: ChangePasswordDto) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_CHANGE_PASSWORD');
    if (confirm) {
      await this.auth.changePassword(data.oldPassword, data.newPassword);
      await this.app.presentAlert('jj._PASSWORD_UPDATED', '_SUCCESS');
    }
  }
}

const form: CmsForm = {
  code: 'change-password',
  labelPosition: 'stacked',
  submitButtonText: '_UPDATE',
  autoValidate: true,
  items: [
    {
      code: 'oldPassword',
      label: { en: 'Old Password', zh: '旧密码' },
      type: 'password',
      required: true,
    },
    {
      code: 'newPassword',
      label: { en: 'New Password', zh: '新密码' },
      type: 'password',
      required: true,
    },
    {
      code: 'confirmPassword',
      label: { en: 'Confirm Password', zh: '确认密码' },
      type: 'password',
      required: true,
      matchWith: ['newPassword'],
    },
  ],
};

interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

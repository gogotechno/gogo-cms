import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { JJUser } from 'src/app/jj/typings';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  userId: number;
  form: CmsForm;

  constructor(private appUtils: AppUtils, private modalCtrl: ModalController, private core: CoreService) {}

  ngOnInit() {
    this.form = form;
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }

  async onResetPassword(user: Partial<JJUser>) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_RESET_PASSWORD');
    if (confirm) {
      await this.core.updateUser(this.userId, {
        password: user.new_password,
      });
      await this.appUtils.presentAlert('jj._PASSWORD_RESET', '_SUCCESS');
      await this.modalCtrl.dismiss();
    }
  }
}

const form: CmsForm = {
  code: 'reset-password',
  labelPosition: 'stacked',
  submitButtonText: '_RESET',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'new_password',
      label: {
        en: 'New Password',
        zh: '新密码',
        ms: 'Kata Laluan Baharu'
      },
      type: 'password',
      required: true,
    },
    {
      code: 'confirm_password',
      label: {
        en: 'Confirm Password',
        zh: '确认密码',
        ms: 'Mengesahkan Kata Laluan'
      },
      type: 'password',
      required: true,
      matchWith: ['new_password'],
    },
  ],
};

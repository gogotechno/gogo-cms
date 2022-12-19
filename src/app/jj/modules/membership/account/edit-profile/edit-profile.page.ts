import { Component, OnInit } from '@angular/core';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from 'src/app/jj/services';
import { User } from 'src/app/jj/typings';
import { AccountService } from '../@services/account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  form: CmsForm;
  user: User;

  constructor(
    private app: AppUtils,
    private auth: AuthService,
    private account: AccountService,
    private modalController: ModalController,
    private appUtils: AppUtils,
  ) {}

  ngOnInit() {
    this.form = this.auth.userType == 'CUSTOMER' ? customerform : userForm;
    this.account.user.subscribe((user) => (this.user = user));
  }

  async onSubmit(data: User) {
    const confirm = await this.app.presentConfirm('jj._CONFIRM_TO_UPDATE_PROFILE');
    if (!confirm) return;
    if (this.auth.userType == 'MERCHANT') {
      await this.auth.updateMe(data);
      await this.app.presentAlert('jj._PROFILE_UPDATED', '_SUCCESS');
    } else {
      // VALIDATE PHONE NUMBER BEFORE LOGIN
      const modal = await this.modalController.create({
        component: PhoneNumberVerificationComponent,
        componentProps: {
          phone: `+6${(<JJCustomer>data).phone}`,
        },
      });

      modal.onDidDismiss().then(async (v) => {
        if (!v.data) {
          return;
        }

        if (v.data.status === 'success') {
          try {
            // await this.appUtils.presentLoading();
            await this.auth.updateMe(data);
            await this.app.presentAlert('jj-luckydraw._PROFILE_UPDATED', '_SUCCESS');
          } catch (error) {
            await this.appUtils.presentAlert(error.error?.error || error?.message, '_FAILED');
          } finally {
            // await this.appUtils.dismissLoading();
          }
        } else {
          await this.appUtils.presentAlert(v.data.error?.message, '_FAILED');
        }
      });

      await modal.present();
    }
  }
}

const userForm: CmsForm = {
  code: 'edit-profile',
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
      code: 'email',
      label: {
        en: 'Email',
        zh: '电子邮件',
        ms: 'Emel',
      },
      type: 'text',
      required: true,
    },
  ],
};

const customerform: CmsForm = {
  code: 'edit-profile',
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
    },
    {
      code: 'lastName',
      label: {
        en: 'Last Name',
        zh: '姓氏',
        ms: 'Nama Terakhir',
      },
      type: 'text',
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

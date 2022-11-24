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

  constructor(private app: AppUtils, private auth: AuthService, private account: AccountService) {}

  ngOnInit() {
    this.form = this.auth.userType == 'MERCHANT' ? userForm : customerform;
    this.account.user.subscribe((user) => {
      this.user = user;
    });
  }

  async onSubmit(data: User) {
    let confirm = await this.app.presentConfirm('jj._CONFIRM_TO_UPDATE_PROFILE');
    if (confirm) {
      await this.auth.updateMe(data);
      await this.app.presentAlert('jj._PROFILE_UPDATED', '_SUCCESS');
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
      label: { en: 'First Name', zh: '名字' },
      type: 'text',
      required: true,
    },
    {
      code: 'lastName',
      label: { en: 'Last Name', zh: '姓氏' },
      type: 'text',
      required: true,
    },
    {
      code: 'email',
      label: { en: 'Email', zh: '电子邮件' },
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
      label: { en: 'First Name', zh: '名字' },
      type: 'text',
    },
    {
      code: 'lastName',
      label: { en: 'Last Name', zh: '姓氏' },
      type: 'text',
    },
    {
      code: 'phone',
      label: { en: 'Phone Number', zh: '手机号码' },
      type: 'text',
      required: true,
    },
  ],
};

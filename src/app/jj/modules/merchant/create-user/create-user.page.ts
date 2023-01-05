import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJMerchant, JJUser } from 'src/app/jj/typings';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  form: CmsForm;
  user: Partial<JJUser>;
  merchant: JJMerchant;
  success: boolean;

  constructor(
    private router: Router,
    private cmsUtils: CmsUtils,
    private appUtils: AppUtils,
    private auth: AuthService,
    private core: CoreService,
  ) {}

  async ngOnInit() {
    this.form = form;
    const roles = await this.auth.findMyUserRoles();
    const roleField = this.form.items.find((item) => item.code == 'role');
    roleField.options = roles.map((role) => ({
      code: role.code,
      label: this.cmsUtils.parseCmsTranslation(role.name),
    }));
    this.user = {
      merchant_id: await this.auth.findMyMerchantId(),
      role: 'MERCHANT_ADMIN',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  async onCreateUser(user: JJUser) {
    const confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_CREATE_USER');
    if (!confirm) {
      return;
    }
    await this.core.createUser(user);
    await this.appUtils.presentAlert('jj._USER_CREATED', '_SUCCESS');
    await this.router.navigate(['/jj/merchant/scratch-and-wins'], {
      replaceUrl: true,
      queryParams: {
        refresh: true,
      },
    });
  }
}

const form: CmsForm = {
  code: 'create-user',
  labelPosition: 'stacked',
  submitButtonText: '_CREATE',
  autoValidate: true,
  autoRemoveUnusedKeys: 'swserp',
  items: [
    {
      code: 'merchant_id',
      label: {
        en: 'Merchant',
        zh: '商家',
        ms: 'Pedagang',
      },
      type: 'number',
      required: true,
      hidden: true,
    },
    {
      code: 'role',
      label: {
        en: 'Role',
        zh: '角色',
        ms: 'Peranan',
      },
      type: 'select',
      required: true,
    },
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
    {
      code: 'password',
      label: {
        en: 'Password',
        zh: '密码',
        ms: 'Kata Laluan',
      },
      type: 'password',
      required: true,
    },
  ],
};

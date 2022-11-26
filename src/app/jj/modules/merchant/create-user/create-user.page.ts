import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { AuthService, CoreService } from 'src/app/jj/services';
import { JJMerchant, JJUser, UserRole } from 'src/app/jj/typings';

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
    private cmsUtils: CmsUtils,
    private appUtils: AppUtils,
    private modalCtrl: ModalController,
    private auth: AuthService,
    private core: CoreService,
  ) {}

  async ngOnInit() {
    this.form = form;
    let roles = await this.core.getUserRoles();
    let roleField = this.form.items.find((item) => item.code == 'role');
    roleField.options = roles
      .filter((role) => role.code != UserRole.SYSTEM_ADMIN)
      .map((role) => ({
        code: role.code,
        label: this.cmsUtils.parseCmsTranslation(role.name),
      }));

    this.merchant = await this.auth.findMyMerchant();

    this.user = {
      merchant_id: this.merchant.doc_id,
      role: UserRole.MERCHANT_ADMIN,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  async onCreateUser(user: JJUser) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_CREATE_USER');
    if (confirm) {
      await this.core.createUser(user);
      await this.appUtils.presentAlert('jj._USER_CREATED', '_SUCCESS');
      this.success = true;
      this.onDismiss();
    }
  }

  async onDismiss() {
    await this.modalCtrl.dismiss({
      success: this.success,
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
      },
      type: 'select',
      required: true,
    },
    {
      code: 'firstName',
      label: {
        en: 'First Name',
        zh: '名字',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'lastName',
      label: {
        en: 'Last Name',
        zh: '姓氏',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'email',
      label: {
        en: 'Email',
        zh: '电子邮件',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'password',
      label: {
        en: 'Password',
        zh: '密码',
      },
      type: 'password',
      required: true,
    },
  ],
};

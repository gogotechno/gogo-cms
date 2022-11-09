import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm, CmsFormItemOption } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJUser, JJMerchant, UserRole } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;

  form: CmsForm;
  value: JJUser;

  merchant: JJMerchant;

  success: boolean;

  constructor(
    private utils: CmsUtils,
    private app: AppUtils,
    private lucky: JJLuckydrawService,
    private modalCtrl: ModalController,
  ) {}

  async ngOnInit() {
    this.loaded = false;
    this.merchant = await this.lucky.getMyMerchant();
    this.form = form;
    await this.initForm();
    this.initValue();
    this.loaded = true;
  }

  async initForm() {
    let roles = await this.lucky.getUserRolesByMerchant();
    let roleField = this.form.items.find((item) => item.code == 'role');
    roleField.options = roles.map((role) => {
      let item: CmsFormItemOption = {
        code: role.code,
        label: this.utils.transformJSONStringtoCMSTranslation(role.name),
      };
      return item;
    });
  }

  initValue() {
    this.value = {
      merchant_id: this.merchant.doc_id,
      role: UserRole.MERCHANT_ADMIN,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  async onCreateUser(user: JJUser) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    let confirm = await this.app.presentConfirm('jj-luckydraw._CONFIRM_TO_CREATE_USER');
    if (confirm) {
      await this.lucky.createUser(this.cmsForm.removeUnusedKeys('swserp', user));
      await this.app.presentAlert('jj-luckydraw._USER_CREATED', '_SUCCESS');
      this.cmsForm.resetForm();
      this.success = true;
      this.onDismiss();
    }
  }

  async onDismiss() {
    await this.modalCtrl.dismiss({ success: this.success });
  }
}

const form: CmsForm = {
  code: 'create-user',
  submitButtonText: '_CREATE',
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

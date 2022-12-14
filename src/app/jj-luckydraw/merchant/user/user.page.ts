import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm, CmsFormItemOption } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { DocStatus } from 'src/app/sws-erp.type';
import { JJLuckydrawService, UserEvent } from '../../jj-luckydraw.service';
import { JJUser } from '../../jj-luckydraw.type';
import { MERCHANT_ROOT_PATH } from '../merchant.page';
import { UserOptionsComponent } from './user-options/user-options.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;
  userId: number;
  user: JJUser;

  form: CmsForm;
  value: Partial<JJUser>;

  editing: boolean;

  destroy$: Subject<boolean>;

  get editable() {
    return this.user?.doc_status == DocStatus.SUBMIT;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private popoverCtrl: PopoverController,
    private utils: CmsUtils,
    private app: AppUtils,
    private lucky: JJLuckydrawService,
  ) {}

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.userId = params.id;

    this.destroy$ = new Subject<boolean>();
    this.lucky.userChange.next({
      currentUserId: this.userId,
    });

    this.lucky.userChange.pipe(takeUntil(this.destroy$)).subscribe((ev) => {
      if (ev?.beUpdated) {
        this.loadData();
      }
      if (ev?.beRemoved) {
        this.router.navigate([MERCHANT_ROOT_PATH, 'users'], {
          replaceUrl: true,
          queryParams: {
            refresh: true,
          },
        });
      }
    });

    await this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async loadData() {
    this.loaded = false;
    this.editing = false;
    this.user = await this.lucky.getUserById(this.userId);
    this.form = form;
    await this.initForm();
    this.initValue();
    this.loaded = true;
    this.disableForm();
  }

  async enableForm() {
    await this.assertForm()
      .then(() => {
        this.cmsForm.markAsEditable();
        this.cmsForm.markAsSubmitable();
        this.editing = true;
      })
      .catch((err) => console.error(err));
  }

  async disableForm() {
    await this.assertForm()
      .then(() => {
        this.cmsForm.markAsNonEditable();
        this.cmsForm.markAsNonSubmitable();
        this.editing = false;
      })
      .catch((err) => console.error(err));
  }

  assertForm() {
    return new Promise<boolean>((resolve, reject) => {
      const cycle = 100;
      let timeout = 0;
      const interval = setInterval(() => {
        if (timeout > 3000) {
          clearInterval(interval);
          reject('Assert form error: Timeout due to no response');
          return;
        }
        if (this.cmsForm) {
          clearInterval(interval);
          resolve(true);
          return;
        }
        timeout += cycle;
      }, cycle);
    });
  }

  async initForm() {
    const roles = await this.lucky.getUserRolesByMerchant();
    const roleField = this.form.items.find((item) => item.code == 'role');
    roleField.options = roles.map((role) => {
      const item: CmsFormItemOption = {
        code: role.code,
        label: this.utils.parseCmsTranslation(role.name),
      };
      return item;
    });
  }

  initValue() {
    this.value = {
      merchant_id: this.user.merchant_id,
      role: this.user.role,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    };
  }

  async doRefresh(event: Event) {
    const refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onUpdateUser(user: JJUser) {
    const validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    const confirm = await this.app.presentConfirm('jj-luckydraw._CONFIRM_TO_UPDATE_USER');
    if (confirm) {
      await this.lucky.updateUser(this.userId, this.cmsForm.removeUnusedKeys('swserp', user));
      await this.app.presentAlert('jj-luckydraw._USER_UPDATED', '_SUCCESS');
      this.disableForm();
    }
  }

  onEdit() {
    if (this.editing) {
      this.disableForm();
      return;
    }
    this.enableForm();
  }

  async onMoreOptions(event?: Event) {
    const popover = await this.popoverCtrl.create({
      component: UserOptionsComponent,
      componentProps: {
        userId: this.userId,
        user: this.user,
      },
      event,
    });
    await popover.present();
  }
}

const form: CmsForm = {
  code: 'create-user',
  submitButtonText: '_UPDATE',
  items: [
    {
      code: 'merchant_id',
      label: {
        en: 'Merchant',
        zh: '??????',
      },
      type: 'number',
      required: true,
      hidden: true,
    },
    {
      code: 'role',
      label: {
        en: 'Role',
        zh: '??????',
      },
      type: 'select',
      required: true,
    },
    {
      code: 'firstName',
      label: {
        en: 'First Name',
        zh: '??????',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'lastName',
      label: {
        en: 'Last Name',
        zh: '??????',
      },
      type: 'text',
      required: true,
    },
    {
      code: 'email',
      label: {
        en: 'Email',
        zh: '????????????',
      },
      type: 'text',
      required: true,
    },
  ],
};

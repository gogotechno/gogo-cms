import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { FullNamePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { JJUser, UserRole } from 'src/app/jj/typings';
import { DocStatus } from 'src/app/sws-erp.type';
import { MoreOptionsComponent } from './@component/more-options/more-options.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  userId: number;
  user: JJUser;

  form: CmsForm;

  destroy$: Subject<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private popoverCtrl: PopoverController,
    private fullName: FullNamePipe,
    private translate: TranslateService,
    private appUtils: AppUtils,
    private cmsUtils: CmsUtils,
    private core: CoreService,
  ) {
    this.destroy$ = new Subject<boolean>();
  }

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.userId = params.id;

    await this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async loadData() {
    this.form = form;
    let roles = await this.core.getUserRoles();
    let roleField = this.form.items.find((item) => item.code == 'role');
    roleField.options = roles
      .filter((role) => role.code != UserRole.SYSTEM_ADMIN)
      .map((role) => ({
        code: role.code,
        label: this.cmsUtils.parseCmsTranslation(role.name),
      }));

    this.user = await this.core.getUserById(this.userId);
  }

  async onUpdate(user: JJUser) {
    let confirm = await this.appUtils.presentConfirm('jj._CONFIRM_TO_UPDATE_USER');
    if (confirm) {
      await this.core.updateUser(this.userId, user);
      await this.appUtils.presentAlert('jj._USER_UPDATED', '_SUCCESS');
    }
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async openMoreOptions(event: Event) {
    const popover = await this.popoverCtrl.create({
      event: event,
      component: MoreOptionsComponent,
      componentProps: {
        userId: this.userId,
        user: this.user,
      },
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();

    if (data?.removeUser) {
      let name = this.fullName.transform(this.user.firstName, this.user.lastName);
      let message = await this.translate.get('jj._CONFIRM_TO_REMOVE_USER', { name: name }).toPromise();
      let confirm = await this.appUtils.presentConfirm(message, '_WARNING');
      if (confirm) {
        await this.core.updateUser(this.userId, {
          doc_status: DocStatus.CANCEL,
        });
        await this.appUtils.presentAlert('jj._USER_REMOVED', '_SUCCESS');
        await this.router.navigate(['/jj/merchant/users'], {
          replaceUrl: true,
          queryParams: {
            refresh: true,
          },
        });
      }
    }
  }
}

const form: CmsForm = {
  code: 'create-user',
  labelPosition: 'stacked',
  submitButtonText: '_UPDATE',
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
  ],
};

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FullNamePipe } from 'src/app/cms-ui/cms.pipe';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from 'src/app/jj-luckydraw/auth.service';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJUser } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { DocStatus } from 'src/app/sws-erp.type';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserPage } from '../user.page';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss'],
})
export class UserOptionsComponent implements OnInit {

  userId: number;
  user: JJUser;

  constructor(
    private popoverCtrl: PopoverController,
    private app: AppUtils,
    private fullName: FullNamePipe,
    private translate: TranslateService,
    private lucky: JJLuckydrawService
  ) { }

  ngOnInit() { }

  async onResetPassword() {
    await this.popoverCtrl.dismiss();
    const popover = await this.popoverCtrl.create({
      component: ResetPasswordComponent,
      componentProps: { userId: this.userId }
    })
    await popover.present();
  }

  async onRemoveUser() {
    await this.popoverCtrl.dismiss();
    let name = this.fullName.transform(this.user.firstName, this.user.lastName);
    let message = await this.translate.get("jj-luckydraw._CONFIRM_TO_REMOVE_USER", { name: name }).toPromise();
    let confirm = await this.app.presentConfirm(message, "_WARNING");
    if (confirm) {
      let updateForm = { doc_status: DocStatus.CANCEL };
      await this.lucky.updateUser(this.userId, updateForm);
      await this.app.presentAlert("jj-luckydraw._USER_REMOVED", "_SUCCESS");
      this.lucky.userChange.next({
        currentUserId: this.userId,
        beUpdated: true
      })
    }
  }

}

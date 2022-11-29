import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { JJUser } from 'src/app/jj/typings';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss'],
})
export class MoreOptionsComponent implements OnInit {
  userId: number;
  user: JJUser;

  constructor(private popoverCtrl: PopoverController, private modalCtrl: ModalController) {}

  ngOnInit() {}

  async onResetPassword() {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ResetPasswordComponent,
      componentProps: {
        userId: this.userId,
      },
    });
    await modal.present();
  }

  async onRemoveUser() {
    await this.popoverCtrl.dismiss({
      removeUser: true,
    });
  }
}

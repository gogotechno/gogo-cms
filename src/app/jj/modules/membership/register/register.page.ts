import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, ModalController, Platform } from '@ionic/angular';
import { PhoneNumberVerificationComponent } from 'src/app/cms-ui/phone-number-verification/phone-number-verification.component';
import { CmsService } from 'src/app/cms.service';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils, CmsUtils } from 'src/app/cms.util';
import { SwsErpService } from 'src/app/sws-erp.service';
import { AuthService } from 'src/app/jj/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  platform: string;
  form: CmsForm | null = null;
  value: any | null = null;
  referrerCode: string;

  constructor(
    route: ActivatedRoute,
    private cms: CmsService,
    private alertController: AlertController,
    public modalController: ModalController,
    private erp: SwsErpService,
    platform: Platform,
    private appUtils: AppUtils,
    private router: Router,
    private auth: AuthService,
  ) {
    this.referrerCode = route.snapshot.queryParams.referrerCode;
    this.platform = platform.is('ios') ? 'ios' : 'md';
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    if (this.referrerCode) {
      console.log(`Register with referrer code: ${this.referrerCode}`);
      this.value = { referrerCode: this.referrerCode };
    }
    this.form = await this.cms.getForm('member-registration');
    this.form.autoRemoveUnusedKeys = 'swserp';
    this.form.autoValidate = true;
  }

  async onRegister(formValue: any) {
    console.log(`Member registering...`);
    // CMS FORM VALIDATION

    // PRESENT PHONE VERIFICATION
    const phone = `+6${formValue.phone}`;
    const modal = await this.modalController.create({
      component: PhoneNumberVerificationComponent,
      componentProps: { phone },
    });
    modal.onDidDismiss().then(async (v) => {
      if (!v.data) {
        return;
      }

      if (v.data.status === 'success') {
        try {
          await this.appUtils.presentLoading();
          const response = await this.erp.postDoc('Customer', formValue, { skipErrorAlert: true });
          await this.auth.signInCustomer(formValue.phone, formValue.password, true);
          this.router.navigateByUrl('/jj', { replaceUrl: true });
        } catch (error) {
          await this.appUtils.presentAlert(error.error?.error || error?.message, '_FAILED');
        } finally {
          await this.appUtils.dismissLoading();
        }
      } else {
        await this.appUtils.presentAlert(v.data.error?.message, '_FAILED');
      }
    });
    await modal.present();
  }
}

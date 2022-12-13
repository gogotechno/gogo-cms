import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmationResult, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
import { LoadingController, ModalController, RefresherCustomEvent, ViewWillEnter } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';

const auth = getAuth();

@Component({
  selector: 'cms-phone-number-verification',
  templateUrl: './phone-number-verification.component.html',
  styleUrls: ['./phone-number-verification.component.scss'],
})
export class PhoneNumberVerificationComponent implements OnInit, ViewWillEnter {

  @ViewChild('recaptchaContainer')
  recaptchaContainer: ElementRef<HTMLDivElement>;

  private recaptchaVerifier: RecaptchaVerifier;
  private recaptchaWidgetId: number;
  private confirmationResult: ConfirmationResult;

  @Input('phone') phone: string;

  verificationCode: string;

  constructor(
    public loadingController: LoadingController,
    public modalController: ModalController,
    public appUtils: AppUtils,
  ) { }

  ngOnInit() {
    console.log(this.phone);
  }

  async loadData(event?: Event) {
    if (!this.phone) {
      return;
    }

    let loading = await this.loadingController.create();
    try {
      await loading.present();
      console.log(`Generating recaptcha...`);
      if (!this.recaptchaVerifier) {
        this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' }, auth);
        this.recaptchaWidgetId = await this.recaptchaVerifier.render();
      }
      console.log(`Recaptcha generated with ID ${this.recaptchaWidgetId}`);
      console.log(`Sign in with phone number ${this.phone}...`);
      this.confirmationResult = await signInWithPhoneNumber(auth, this.phone, this.recaptchaVerifier);
    } catch (error) {
      console.error(error);
      this.modalController.dismiss({ status: 'failed', error: error });
    } finally {
      if (event) {
        // TODO: IF EVENT IS RefresherCustomEvent
        (<RefresherCustomEvent>event).detail.complete();
      }
      loading.dismiss();
    }
  }

  async verify(event?: Event) {
    try {
      await this.appUtils.presentLoading();
      let userCredential = await this.confirmationResult.confirm(this.verificationCode);
      this.modalController.dismiss({ status: 'success', userCredential: userCredential });
    } catch (error) {
      this.modalController.dismiss({ status: 'failed', error: error });
    } finally {
      await this.appUtils.dismissLoading();
    }
  }

  change(event?: Event) {
    this.modalController.dismiss();
  }

  ionViewWillEnter(): void {
    this.loadData();
  }

}

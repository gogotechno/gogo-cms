import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AuthService } from '../auth.service';
import { JJLuckydrawService } from '../jj-luckydraw.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;

  form: CmsForm;
  value: SignIn;

  constructor(private router: Router, private auth: AuthService, private lucky: JJLuckydrawService) {}

  ngOnInit() {
    this.loaded = false;

    this.form = form;
    this.value = {
      email: '',
      password: '',
      rememberMe: true,
    };

    this.loaded = true;
  }

  async onSignIn(data?: SignIn) {
    const validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    if (data.email.includes('@')) {
      await this.auth.signInUser(data.email, data.password, data.rememberMe);
      await this.lucky.createMerchantWallet();
    } else {
      await this.auth.signInCustomer(data.email, data.password, data.rememberMe);
      await this.lucky.createCustomerWallet();
    }

    this.router.navigateByUrl('/jj-luckydraw', { replaceUrl: true });
  }
}

interface SignIn {
  email: string;
  password: string;
  rememberMe: boolean;
}

const form: CmsForm = {
  code: 'sign-in',
  submitButtonText: '_CONTINUE',
  items: [
    {
      code: 'email',
      label: {
        en: 'Username',
        zh: '登录号',
      },
      type: 'email',
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
    {
      code: 'rememberMe',
      label: {
        en: 'Remember Me',
        zh: '记住我',
      },
      type: 'checkbox',
    },
  ],
};

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { CmsForm } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  @ViewChild(FormComponent) cmsForm: FormComponent;

  loaded: boolean;

  form: CmsForm;
  value: SignIn

  constructor(private router: Router, private app: AppUtils, private auth: AuthService) { }

  ngOnInit() {
    this.loaded = false;

    this.form = form;
    this.value = {
      email: "",
      password: "",
      rememberMe: true
    }

    this.loaded = true;
  }

  async onSignIn(data?: SignIn) {
    let validation = await this.cmsForm.validateFormAndShowErrorMessages();
    if (!validation.valid) {
      return;
    }

    if(data.email.includes('@'))
      await this.auth.signInWithEmailAndPassword(data.email, data.password, data.rememberMe);
    else 
      await this.auth.signInCustomer(data.email, data.password, data.rememberMe);
    
      this.router.navigateByUrl('/jj-luckydraw', { replaceUrl: true });
  }

}

interface SignIn {
  email: string,
  password: string,
  rememberMe: boolean
}

const form: CmsForm = {
  code: "sign-in",
  submitButtonText: "_CONTINUE",
  items: [
    {
      code: "email",
      label: {
        en: "Username",
        zh: "登录号"
      },
      type: "email",
      required: true
    },
    {
      code: "password",
      label: {
        en: "Password",
        zh: "密码"
      },
      type: "password",
      required: true
    },
    {
      code: "rememberMe",
      label: {
        en: "Remember Me",
        zh: "记住我"
      },
      type: "checkbox"
    }
  ]
}
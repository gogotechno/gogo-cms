import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CmsForm, CmsLanguage } from 'src/app/cms.type';
import { AuthService, CommonService } from 'src/app/jj/services';
import { PackageInfo, SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends SharedComponent implements OnInit {
  form = form;
  packageInfo: PackageInfo;
  languages: CmsLanguage[];

  constructor(
    private common: CommonService,
    private auth: AuthService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  async ngOnInit() {
    this.packageInfo = this.getPackageInfo();
    this.languages = await this.common.getSupportedLanguages();
  }

  async onLanguageClick(lang: CmsLanguage) {
    await this.translate.use(lang.code).toPromise();
    this.languages.forEach((l) => (l.selected = l.code == lang.code));
  }

  async onLogin(data?: LoginDto) {
    if (data.email.includes('@')) {
      await this.auth.signInUser(data.email, data.password, data.rememberMe);
      // create wallet
    } else {
      await this.auth.signInCustomer(data.email, data.password, data.rememberMe);
      // create wallet
    }
    await this.router.navigate(['../home'], {
      relativeTo: this.route,
    });
  }
}

const form: CmsForm = {
  code: 'sign-in',
  labelPosition: 'stacked',
  submitButtonText: '_LOGIN_ACCOUNT',
  autoValidate: true,
  items: [
    {
      code: 'email',
      label: { en: 'Username', zh: '登录号' },
      type: 'text',
      required: true,
    },
    {
      code: 'password',
      label: { en: 'Password', zh: '密码' },
      type: 'password',
      required: true,
    },
    {
      code: 'rememberMe',
      label: { en: 'Remember Me', zh: '记住我' },
      type: 'checkbox',
    },
  ],
};

interface LoginDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

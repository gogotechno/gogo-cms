import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private auth: AuthService,
    private common: CommonService,
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
    await this.common.setCurrentLanguage(lang.code);
    this.languages.forEach((l) => (l.selected = l.code == lang.code));
  }

  async onLogin(data?: LoginDto) {
    if (data.email.includes('@')) {
      await this.auth.signInUser(data.email, data.password, data.rememberMe);
    } else {
      await this.auth.signInCustomer(data.email, data.password, data.rememberMe);
    }
    await this.router.navigate(['/jj'], {
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
      label: { en: 'Phone No.', zh: '手机号' },
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

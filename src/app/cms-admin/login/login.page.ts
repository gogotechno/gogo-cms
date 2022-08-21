import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsSignInRequest } from 'src/app/cms.type';
import { CmsAdminService } from '../cms-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: CmsForm;

  constructor(private cms: CmsService, private admin: CmsAdminService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.form = await this.cms.getForm('cms-login-form');
  }

  async signIn(event) {
      await this.admin.signInWithEmailAndPassword(event.email, event.password);
  }

  async forgotPassword(event?: Event) {
  }

}

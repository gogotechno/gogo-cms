import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsSignInRequest } from 'src/app/cms.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: CmsForm;

  constructor(private cms: CmsService, private fireauth: AngularFireAuth) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.form = await this.cms.getForm('cms-login-form');
  }

  async signIn(event) {
    try {
      let credential = this.fireauth.signInWithEmailAndPassword(event.email, event.password);
    } catch (error) {
      alert(error);
    }
  }

  async forgotPassword(event?: Event) {
  }

}

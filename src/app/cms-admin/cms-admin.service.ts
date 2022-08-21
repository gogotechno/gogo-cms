import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@angular/fire/auth'
import { CmsUser } from '../cms.type';
import { CmsService } from '../cms.service';

@Injectable({
  providedIn: 'root'
})
export class CmsAdminService {

  user: CmsUser;

  constructor(private cms: CmsService, private auth: AngularFireAuth, private translate: TranslateService, private router: Router) { }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      let userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      let userTable = await this.cms.getTable('users');
      this.user = await this.cms.getDocument(userTable, userCredential.user.uid);
      this.router.navigateByUrl('/cms-admin');
    } catch (error) {
      alert(error);
    }
  }
  
  async signOut() {
    let confirmationMessage = await this.translate.get('_SIGN_OUT_CONFIRMATION_MESSAGE').toPromise();
    if (confirm(confirmationMessage)) {
      await this.auth.signOut();
      let successMessage = await this.translate.get('_SIGN_OUT_SUCCESS_MESSAGE').toPromise();
      this.router.navigateByUrl('/cms-admin/login', {replaceUrl: true});
      alert(successMessage);
    }
  }

  
  public get currentUser() : Promise<User> {
    return this.auth.currentUser;
  }

  async getCmsUser(): Promise<CmsUser> {
    let userTable = await this.cms.getTable('users');
    this.user = await this.cms.getDocument(userTable, (await this.auth.currentUser).uid);
    return this.user;
  }

  // async getCmsSite(): Promise<CmsSite> {
  //   let userTable = await this.cms.getSite('users');
  //   this.user = await this.cms.getDocument(userTable, (await this.auth.currentUser).uid);
  //   return this.user;
  // }
  
}

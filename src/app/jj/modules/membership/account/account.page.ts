import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { AuthService, CommonService } from 'src/app/jj/services';
import { JJContentPage, UserRole } from 'src/app/jj/typings';
import { AccountService } from './@services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  backButtonText: string;
  contentPages: JJContentPage[];
  whatsappLink: string;
  userRole: UserRole;

  constructor(private auth: AuthService, private common: CommonService, private account: AccountService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    await this.account.init();
    this.account.whatsappLink.subscribe((link) => (this.whatsappLink = link));
    this.account.contentPages.subscribe((contentPages) => (this.contentPages = contentPages));
  }

  ngOnDestroy() {
    this.account.destroy();
  }

  async onLogout() {
    await this.auth.signOut();
  }

  async onHelpCenter() {
    await Browser.open({ url: `https://${this.whatsappLink}` });
  }
}

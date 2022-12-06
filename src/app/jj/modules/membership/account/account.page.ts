import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { AuthService } from 'src/app/jj/services';
import { JJContentPage } from 'src/app/jj/typings';
import { AccountService } from './@services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  contentPages: JJContentPage[];
  whatsappLink: string;

  constructor(private auth: AuthService, private account: AccountService) {}

  ngOnInit() {
    this.account.init();

    this.account.contentPages.subscribe((contentPages) => {
      this.contentPages = contentPages;
    });

    this.account.whatsappLink.subscribe((link) => {
      this.whatsappLink = link;
    });
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

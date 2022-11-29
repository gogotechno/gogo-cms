import { Component, OnInit } from '@angular/core';
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

  constructor(private auth: AuthService, private account: AccountService) {}

  ngOnInit() {
    this.account.init();

    this.account.contentPages.subscribe((contentPages) => {
      this.contentPages = contentPages;
    });
  }

  ngOnDestroy() {
    this.account.destroy();
  }

  async onLogout() {
    await this.auth.signOut();
  }
}

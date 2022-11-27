import { Component, OnInit } from '@angular/core';
import { JJContentPage } from 'src/app/jj/typings';
import { AccountService } from './@services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  contentPages: JJContentPage[];

  constructor(private account: AccountService) {}

  ngOnInit() {
    this.account.init();

    this.account.contentPages.subscribe((contentPages) => {
      this.contentPages = contentPages;
    });
  }
}

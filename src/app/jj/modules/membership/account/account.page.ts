import { Component, OnInit } from '@angular/core';
import { AccountService } from './@services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(private account: AccountService) {}

  ngOnInit() {
    this.account.init();
  }
}

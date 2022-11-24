import { Component, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';
import { User } from 'src/app/jj/typings';
import { AccountService } from '../../@services/account.service';

@Component({
  selector: 'account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss'],
})
export class AccountBarComponent extends SharedComponent implements OnInit {
  greetingKey: string;
  user: User;

  constructor(private account: AccountService) {
    super();
  }

  ngOnInit() {
    this.greetingKey = this.getGreeting();
    this.account.user.subscribe((user) => {
      this.user = user;
    });
  }
}

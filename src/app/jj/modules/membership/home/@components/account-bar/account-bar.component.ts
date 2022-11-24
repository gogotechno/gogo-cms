import { Component, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';
import { User } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss'],
})
export class AccountBarComponent extends SharedComponent implements OnInit {
  greetingKey: string;
  user: User;

  constructor(private home: HomeService) {
    super();
  }

  ngOnInit() {
    this.greetingKey = this.getGreeting();
    this.home.user.subscribe((user) => {
      this.user = user;
    });
  }
}

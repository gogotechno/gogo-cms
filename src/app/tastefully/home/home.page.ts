import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['../tastefully.scss', './home.page.scss'],
})
export class HomePage implements OnInit {

  greetingKey: string;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(event?: Event) {
    let today = new Date();
    if (today.getHours() < 12) {
      this.greetingKey = '_MORNING';
    } else if (today.getHours() <= 2) {
      this.greetingKey = '_GOOD_AFTERNOON';
    } else {
      this.greetingKey = '_GOOD_EVENING';
    }
  }

}

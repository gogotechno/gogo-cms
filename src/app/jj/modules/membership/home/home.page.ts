import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/jj/services';
import { JJFab } from 'src/app/jj/typings';
import { HomeService } from './@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications: number = 0;
  messages: string[];
  fabs: JJFab[];

  constructor(private common: CommonService, private home: HomeService) {}

  async ngOnInit() {
    await this.home.init();

    this.home.announcements.subscribe((announcements) => {
      if (announcements) {
        this.messages = announcements.map((announcement) => announcement.message);
      }
    });

    this.home.fabs.subscribe((fabs) => {
      this.fabs = fabs;
    });
  }

  ngOnDestroy() {
    this.home.destroy();
  }

  async doRefresh(event: Event) {
    await this.home.init();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onFabClick(fab: JJFab) {
    await this.common.navigateFabUrl(fab);
  }
}

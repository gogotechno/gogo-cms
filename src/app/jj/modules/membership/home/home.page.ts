import { Component, OnInit } from '@angular/core';
import { HomeService } from './@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications: number = 0;
  messages: string[];

  constructor(private home: HomeService) {}

  async ngOnInit() {
    await this.home.init();

    this.home.announcements.subscribe((announcements) => {
      if (announcements) {
        this.messages = announcements.map((announcement) => announcement.message);
      }
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
}

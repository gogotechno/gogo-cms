import { Component, OnInit } from '@angular/core';
import { HomeService } from './@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications: number = 0;

  constructor(private home: HomeService) {}

  async ngOnInit() {
    await this.home.init();
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

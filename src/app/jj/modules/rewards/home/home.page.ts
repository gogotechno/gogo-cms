import { Component, OnInit } from '@angular/core';
import { HomeService } from './@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private home: HomeService) {}

  async ngOnInit() {
    await this.loadData();
  }

  ngOnDestroy() {
    this.home.destroy();
  }

  async loadData() {
    await this.home.init();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

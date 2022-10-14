import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { JJLuckydrawService } from '../jj-luckydraw.service';
import { JJEvent } from '../jj-luckydraw.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loaded: boolean;

  lastEndedEvent: JJEvent;

  constructor(private lucky: JJLuckydrawService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.lastEndedEvent = await this.lucky.getLastEndedEvent();
    console.log(this.lastEndedEvent);
    this.loaded = true;
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

}

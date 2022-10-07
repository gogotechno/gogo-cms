import { Component, OnInit } from '@angular/core';
import { JjLuckydrawService } from '../jj-luckydraw.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  lastEndedEvent;

  constructor(private jjLuckyDraw: JjLuckydrawService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?) {
    this.lastEndedEvent = await this.jjLuckyDraw.getLastEndedEvent();
    console.log(this.lastEndedEvent);
  }

}

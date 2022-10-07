import { Component, OnInit } from '@angular/core';
import { JjLuckydrawService } from '../../jj-luckydraw.service';

@Component({
  selector: 'app-ended-events',
  templateUrl: './ended-events.page.html',
  styleUrls: ['./ended-events.page.scss'],
})
export class EndedEventsPage implements OnInit {

  events;

  constructor(private jjLuckydraw: JjLuckydrawService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?) {
    this.events = await this.jjLuckydraw.getEndedEvents();
  }

}

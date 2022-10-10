import { Component, OnInit } from '@angular/core';
import { JJLuckydrawService } from '../../jj-luckydraw.service';

@Component({
  selector: 'app-ended-events',
  templateUrl: './ended-events.page.html',
  styleUrls: ['./ended-events.page.scss'],
})
export class EndedEventsPage implements OnInit {

  events;

  constructor(private jjLuckydraw: JJLuckydrawService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?) {
    // this.events = await this.jjLuckydraw.getEndedEvents();
  }

}

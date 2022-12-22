import { Component, OnInit } from '@angular/core';
import { JJEvent } from 'src/app/jj/typings';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: JJEvent;
  eventId: number;

  constructor() {    

  }

  async ngOnInit() {
  }

}
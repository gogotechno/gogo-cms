import { Component, OnInit } from '@angular/core';
import { TastefullyService } from '../../tastefully.service';
import { TastefullyEvent } from '../../tastefully.type';

@Component({
  selector: 'tastefully-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  events: TastefullyEvent[];

  constructor(private tastefully: TastefullyService) { }

  async ngOnInit() {
    this.events = await this.tastefully.getEvents();
    console.log(this.events);
  }

}

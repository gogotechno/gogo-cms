import { Component, OnInit } from '@angular/core';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'event-location',
  templateUrl: './event-location.component.html',
  styleUrls: ['./event-location.component.scss'],
})
export class EventLocationComponent implements OnInit {
  event: JJEvent;

  constructor(private details: DetailsService) {}

  ngOnInit() {
    this.details.event.subscribe((event) => {
      this.event = event;
    });
  }
}

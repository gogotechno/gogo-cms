import { Component, Input, OnInit } from '@angular/core';
import { JJEvent } from '../../jj-luckydraw.type';

@Component({
  selector: 'lucky-event-with-winning-summary',
  templateUrl: './event-with-winning-summary.component.html',
  styleUrls: ['./event-with-winning-summary.component.scss'],
})
export class EventWithWinningSummaryComponent implements OnInit {

  @Input("event") event: JJEvent;

  constructor() { }

  ngOnInit() { }

}

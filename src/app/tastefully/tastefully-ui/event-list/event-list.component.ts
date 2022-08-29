import { Component, Input, OnInit } from '@angular/core';
import { TastefullyEvent } from '../../tastefully.type';

@Component({
  selector: 'tastefully-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {

  @Input() events: TastefullyEvent[];

  constructor() { }

  ngOnInit() { }

}

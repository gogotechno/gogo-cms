import { Component, Input, OnInit } from '@angular/core';
import { JJEvent } from '../../jj-luckydraw.type';

@Component({
  selector: 'lucky-latest-draw',
  templateUrl: './latest-draw.component.html',
  styleUrls: ['./latest-draw.component.scss'],
})
export class LatestDrawComponent implements OnInit {

  @Input("event") event: JJEvent;

  constructor() { }

  ngOnInit() { }

}

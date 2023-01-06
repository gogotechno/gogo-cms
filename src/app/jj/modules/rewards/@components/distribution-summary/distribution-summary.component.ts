import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'distribution-summary',
  templateUrl: './distribution-summary.component.html',
  styleUrls: ['./distribution-summary.component.scss'],
})
export class DistributionSummaryComponent implements OnInit {
  @Input() tickets: number = 0;
  @Input() points: number = 0;
  @Input() snwTickets: number = 0;

  constructor() {}

  ngOnInit() {}
}

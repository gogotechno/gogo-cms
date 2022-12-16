import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'distribution-summary',
  templateUrl: './distribution-summary.component.html',
  styleUrls: ['./distribution-summary.component.scss'],
})
export class DistributionSummaryComponent implements OnInit {
  @Input() tickets: number;
  @Input() points: number;
  @Input() snwTickets: number;

  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'distribution-summary',
  templateUrl: './distribution-summary.component.html',
  styleUrls: ['./distribution-summary.component.scss'],
})
export class DistributionSummaryComponent implements OnInit {
  @Input('tickets') tickets: number;
  @Input('points') points: number;
  @Input('snwTickets') snwTickets: number;

  constructor() {}

  ngOnInit() {}
}

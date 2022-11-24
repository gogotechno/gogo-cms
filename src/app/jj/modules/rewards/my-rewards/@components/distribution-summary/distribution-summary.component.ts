import { Component, Input, OnInit } from '@angular/core';
import { JJTicketDistribution } from 'src/app/jj/typings';

@Component({
  selector: 'distribution-summary',
  templateUrl: './distribution-summary.component.html',
  styleUrls: ['./distribution-summary.component.scss'],
})
export class DistributionSummaryComponent implements OnInit {
  @Input('distribution') distribution: JJTicketDistribution;

  constructor() {}

  ngOnInit() {}
}

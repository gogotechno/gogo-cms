import { Component, OnInit } from '@angular/core';
import { JJTicketDistribution } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'distribution-details',
  templateUrl: './distribution-details.component.html',
  styleUrls: ['./distribution-details.component.scss'],
})
export class DistributionDetailsComponent implements OnInit {
  distribution: JJTicketDistribution;

  constructor(private details: DetailsService) {}

  ngOnInit() {
    this.details.distribution.subscribe((distribution) => {
      this.distribution = distribution;
    });
  }
}

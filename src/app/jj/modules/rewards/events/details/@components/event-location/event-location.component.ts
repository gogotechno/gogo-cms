import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/jj/services';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'event-location',
  templateUrl: './event-location.component.html',
  styleUrls: ['./event-location.component.scss'],
})
export class EventLocationComponent implements OnInit {
  event: JJEvent;

  constructor(private common: CommonService, private details: DetailsService) {}

  ngOnInit() {
    this.details.event.subscribe((event) => (this.event = event));
  }

  openLocation() {
    if (!this.event.merchant) {
      return;
    }

    const merchant = this.event.merchant;
    const address =
      `${merchant.addressLine1}${merchant.addressLine2 ? ` ${merchant.addressLine2}` : ''},` +
      `+${merchant.postalCode}+${merchant.city},` +
      `+${merchant.state},` +
      `+${merchant.country}`;

    this.common.searchGoogleMap(address);
  }
}

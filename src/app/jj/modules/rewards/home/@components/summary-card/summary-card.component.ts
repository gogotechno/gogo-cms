import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { JJCustomer, JJSlideshow } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit {
  customer: JJCustomer;
  slideshow: JJSlideshow;

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.home.customer.subscribe((customer) => {
      this.customer = customer;
    });

    this.home.slideshow.subscribe((slideshow) => {
      this.slideshow = slideshow;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'gift-lottery',
  templateUrl: './gift-lottery.component.html',
  styleUrls: ['./gift-lottery.component.scss'],
})
export class GiftLotteryComponent implements OnInit {
  event: JJEvent;

  constructor(private details: DetailsService) {}

  ngOnInit() {
    this.details.event.subscribe((event) => {
      this.event = event;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { JJEvent } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'lucky-draw-cards',
  templateUrl: './lucky-draw-cards.component.html',
  styleUrls: ['./lucky-draw-cards.component.scss'],
})
export class LuckyDrawCardsComponent implements OnInit {
  slideOpts = slideOpts;
  events: JJEvent[];

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.home.ongoingEvents.subscribe((events) => {
      this.events = events;
    });
  }
}

const slideOpts = {
  spaceBetween: 8,
  slidesPerView: 2.5,
};

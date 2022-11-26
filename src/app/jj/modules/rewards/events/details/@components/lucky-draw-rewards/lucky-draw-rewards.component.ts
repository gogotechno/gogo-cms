import { Component, OnInit } from '@angular/core';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'lucky-draw-rewards',
  templateUrl: './lucky-draw-rewards.component.html',
  styleUrls: ['./lucky-draw-rewards.component.scss'],
})
export class LuckyDrawRewardsComponent implements OnInit {
  event: JJEvent;

  constructor(private details: DetailsService) {}

  async ngOnInit() {
    this.details.event.subscribe((event) => {
      this.event = event;
    });
  }
}

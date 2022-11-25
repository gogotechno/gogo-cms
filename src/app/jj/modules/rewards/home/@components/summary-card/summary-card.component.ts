import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/jj/services/core.service';
import * as _ from 'lodash';
import { JJWinner } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit {
  winners: JJWinner[];
  winnerGroups: JJWinner[][];

  constructor(private home: HomeService) {}

  async ngOnInit() {
    this.home.winners.subscribe((winners) => {
      this.winners = winners;
      if (this.winners) {
        this.winnerGroups = _.chunk(this.winners, 8);
      }
    });
  }
}

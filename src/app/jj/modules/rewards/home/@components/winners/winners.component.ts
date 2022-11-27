import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { JJWinner } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class SummaryCardComponent implements OnInit {
  @Input() winners: JJWinner[];
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

import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/jj/services/core.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit {
  // TODO: add typed interface
  winners: any[];
  winnerGroup: any[][];

  constructor(private core: CoreService) {}

  async ngOnInit() {
    this.winners = await this.core.getWinners({
      itemsPerPage: 32,
      currentPage: 1,
    });

    console.log(this.winners);

    this.winnerGroup = _.chunk(this.winners, 8);

    console.log(this.winnerGroup);
  }
}

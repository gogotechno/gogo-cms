import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJDrawingResult, JJEvent, JJEventPrize, JJWinner } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'lucky-draw-result',
  templateUrl: './lucky-draw-result.component.html',
  styleUrls: ['./lucky-draw-result.component.scss'],
})
export class LuckyDrawResultComponent extends SharedComponent implements OnInit {
  event: JJEvent;
  result: JJDrawingResult;
  winnersPage: Pagination;
  winnersEnded: boolean;
  winners: JJWinner[];

  prizeGroups: {
    prize: JJEventPrize;
    winners: JJWinner[];
  }[];

  constructor(private modalCtrl: ModalController, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    this.result = this.event.drawingResult;
    this.prizeGroups = [];
    this.winnersPage = this.defaultPage;

    let winners = await this.getWinners();
    this.winners = winners;
    this.grouping(winners);
    this.winnersEnded = this.winners.length < this.winnersPage.itemsPerPage;
  }

  onDismiss(event?: Event) {
    this.modalCtrl.dismiss();
  }

  grouping(winners: JJWinner[]) {
    for (let winner of winners) {
      let index = this.prizeGroups.findIndex((group) => group.prize.doc_id == winner.prize_id);
      if (index > -1) {
        this.prizeGroups[index].winners.push(winner);
      } else {
        this.prizeGroups.push({
          prize: winner.prize,
          winners: [winner],
        });
      }
    }
  }

  async getWinners() {
    let winners = await this.core.getWinners(this.winnersPage, {
      drawing_result_id: this.result.doc_id,
      drawing_result_id_type: '=',
    });
    return winners;
  }

  async loadMoreWinners(event: Event) {
    this.winnersPage.currentPage += 1;
    let incoming = await this.getWinners();
    this.winners = [...this.winners, ...incoming];
    this.grouping(incoming);
    this.winnersEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }
}

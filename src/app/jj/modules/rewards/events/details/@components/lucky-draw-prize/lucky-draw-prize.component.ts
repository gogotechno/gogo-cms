import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEventPrize, JJWinner } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-lucky-draw-prize',
  templateUrl: './lucky-draw-prize.component.html',
  styleUrls: ['./lucky-draw-prize.component.scss'],
})
export class LuckyDrawPrizeComponent extends SharedComponent implements OnInit {
  prize: JJEventPrize;
  winnersPage: Pagination;
  winnersEnded: boolean;
  winners: JJWinner[];

  constructor(private modalCtrl: ModalController, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    this.winnersPage = this.defaultPage;
    this.winners = await this.getWinners();
    this.winnersEnded = this.winners.length < this.winnersPage.itemsPerPage;
  }

  onDismiss(event?: Event) {
    this.modalCtrl.dismiss();
  }

  async getWinners() {
    let winners = await this.core.getWinners(this.winnersPage, {
      prize_id: this.prize.doc_id,
      prize_id_type: '=',
    });
    return winners;
  }

  async loadMoreWinners(event: Event) {
    this.winnersPage.currentPage += 1;
    let incoming = await this.getWinners();
    this.winners = [...this.winners, ...incoming];
    this.winnersEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJScratchAndWinEvent, JJScratchAndWinPrize } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';
import { Currency } from '../../../wallets/wallets.types';

@Component({
  selector: 'app-scratch-prizes',
  templateUrl: './scratch-prizes.component.html',
  styleUrls: ['./scratch-prizes.component.scss'],
})
export class ScratchPrizesComponent extends SharedComponent implements OnInit {
  eventId: number;
  event: JJScratchAndWinEvent;
  prizesPage: Pagination;
  prizesEnded: boolean;
  prizes: JJScratchAndWinPrize[];

  displayCurrency: Currency = {
    code: 'MYR',
    displaySymbol: 'RM',
    precision: 2,
    symbolPosition: 'START',
  };

  constructor(private modalCtrl: ModalController, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.prizesPage = {
      ...this.defaultPage,
      sortBy: 'worth',
    };

    this.prizes = await this.getPrizes();
    this.prizesEnded = this.prizes.length < this.prizesPage.itemsPerPage;
  }

  async getPrizes() {
    const prizes = await this.core.getScratchAndWinPrizes(this.prizesPage, {
      scratch_and_win_event_id: this.eventId,
      scratch_and_win_event_id_type: '=',
    });
    return prizes;
  }

  async loadMorePrizes(event: Event) {
    this.prizesPage.currentPage += 1;
    const incoming = await this.getPrizes();
    this.prizes = [...this.prizes, ...incoming];
    this.prizesEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

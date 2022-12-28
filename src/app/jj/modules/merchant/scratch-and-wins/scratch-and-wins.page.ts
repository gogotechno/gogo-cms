import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { Pagination } from 'src/app/sws-erp.type';
import { DatePipe } from '@angular/common';
import { JJScratchAndWinEvent } from 'src/app/jj/typings';

@Component({
  selector: 'app-scratch-and-wins',
  templateUrl: './scratch-and-wins.page.html',
  styleUrls: ['./scratch-and-wins.page.scss'],
})
export class ScratchAndWinsPage extends SharedComponent implements OnInit {
  ScratchAndWinsPage: Pagination;
  ScratchAndWinsEnded: boolean;
  ScratchAndWins: JJScratchAndWinEvent[][];
  updatedAt: Date;

  get dates(): string[] {
    if (!this.ScratchAndWins) {
      return null;
    }
    return Object.keys(this.ScratchAndWins);
  }

  constructor(private core: CoreService, private date: DatePipe, private menuCtrl: MenuController) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.ScratchAndWinsPage = this.defaultPage;
    let events = await this.getScratchAndWinEvents();
    this.grouping(events);
    this.ScratchAndWinsEnded = events.length < this.ScratchAndWinsPage.itemsPerPage;
  }

  async getScratchAndWinEvents() {
    let events = await this.core.getScratchAndWinEvents(this.ScratchAndWinsPage);
    this.updatedAt = new Date();
    return events;
  }

  async loadMoreEvents(event: Event) {
    this.ScratchAndWinsPage.currentPage += 1;
    let incoming = await this.getScratchAndWinEvents();
    this.grouping(incoming);
    this.ScratchAndWinsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  grouping(events: JJScratchAndWinEvent[]) {
    if (!this.ScratchAndWins) {
      this.ScratchAndWins = [];
    }
    events.forEach((events) => {
      let date = this.date.transform(events.doc_createdDate, 'd/M/yyyy');
      let list = this.ScratchAndWins[date];
      if (list === undefined) {
        list = [events];
      } else {
        list.push(events);
      }
      this.ScratchAndWins[date] = list;
    });
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }
}

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
  scratchAndWinsPage: Pagination;
  scratchAndWinsEnded: boolean;
  scratchAndWinEvents: JJScratchAndWinEvent[];
  updatedAt: Date;

  constructor(private core: CoreService, private date: DatePipe, private menuCtrl: MenuController) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.scratchAndWinsPage = this.defaultPage;
    this.scratchAndWinEvents = await this.getScratchAndWinEvent();
    this.scratchAndWinsEnded = this.scratchAndWinEvents.length < this.scratchAndWinsPage.itemsPerPage;
  }

  async getScratchAndWinEvent() {
    let events = await this.core.getScratchAndWinEvents(this.scratchAndWinsPage);
    this.updatedAt = new Date();
    return events;
  }

  async loadMoreEvents(event: Event) {
    this.scratchAndWinsPage.currentPage += 1;
    let incoming = await this.getScratchAndWinEvent();
    this.scratchAndWinEvents = [...this.scratchAndWinEvents, ...incoming];
    this.scratchAndWinsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
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

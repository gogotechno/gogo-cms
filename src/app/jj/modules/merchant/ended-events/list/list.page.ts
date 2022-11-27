import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  eventsPage: Pagination;
  eventsEnded: boolean;
  events: JJEvent[];

  constructor(private core: CoreService) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.eventsEnded = false;
    this.eventsPage = this.defaultPage;
    this.events = await this.getEndedEvents();
    this.eventsEnded = this.events.length < this.eventsPage.itemsPerPage;
  }

  async getEndedEvents() {
    let events = await this.core.getEvents(this.eventsPage, {
      status: 'ENDED',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'desc',
      withSummary: true,
      withoutResult: true,
    });
    return events;
  }

  async loadMoreEvents(event: Event) {
    this.eventsPage.currentPage += 1;
    let incoming = await this.getEndedEvents();
    this.events = [...this.events, ...incoming];
    this.eventsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

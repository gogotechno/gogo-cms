import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJEvent } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-ended-events',
  templateUrl: './ended-events.page.html',
  styleUrls: ['./ended-events.page.scss'],
})
export class EndedEventsPage implements OnInit {

  loaded: boolean;
  eventPagination: Pagination;
  events: JJEvent[];
  noMoreEvents: boolean;

  constructor(private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreEvents = false;
    await this.loadEvents();
    this.loaded = true;
  }

  async loadEvents() {
    this.eventPagination = {
      itemsPerPage: 10,
      currentPage: 1
    };

    this.events = await this.lucky.getEndedEvents(this.eventPagination);
    this.noMoreEvents = this.events.length < this.eventPagination.itemsPerPage;
  }

  async loadMoreEvents(event: Event) {
    const infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.eventPagination.currentPage += 1;
    const events = await this.lucky.getEndedEvents(this.eventPagination);
    this.events = [...this.events, ...events];
    this.noMoreEvents = events.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    const refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

}

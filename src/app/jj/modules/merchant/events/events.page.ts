import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJEvent } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage extends SharedComponent implements OnInit {
  eventsPage: Pagination;
  eventsEnded: boolean;
  events: JJEvent[][];
  updatedAt: Date;

  get dates(): string[] {
    if (!this.events) {
      return null;
    }
    return Object.keys(this.events);
  }

  constructor(private route: ActivatedRoute, private core: CoreService, private date: DatePipe) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.eventsPage = this.defaultPage;
    let events = await this.getEvents();
    console.log(events);
    // this.grouping(events);
    this.eventsEnded = events.length < this.eventsPage.itemsPerPage;
  }

  async getEvents() {
    let events = await this.core.getEvents(this.eventsPage);
    this.updatedAt = new Date();
    return events;
  }

  // async loadMoreEvents(event: Event) {
  //   this.eventsPage.currentPage += 1;
  //   let incoming = await this.getEvents();
  //   this.grouping(incoming);
  //   this.eventsEnded = incoming.length <= 0;
  //   let scroller = <HTMLIonInfiniteScrollElement>event.target;
  //   scroller.complete();
  // }

  // grouping(events: JJEvent[]) {
  //   if (!this.events) {
  //     this.events = [];
  //   }
  //   events.forEach((events) => {
  //     let date = this.date.transform(events.doc_createdDate, 'd/M/yyyy');
  //     let list = this.events[date];
  //     if (list === undefined) {
  //       list = [events];
  //     } else {
  //       list.push(events);
  //     }
  //     this.events[date] = list;
  //   });
  // }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

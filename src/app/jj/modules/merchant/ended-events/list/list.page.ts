import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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

  constructor(private menuCtrl: MenuController, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }

  async loadData() {
    this.eventsEnded = false;
    this.eventsPage = this.defaultPage;
    this.events = await this.getEndedEvents();
    this.eventsEnded = this.events.length < this.eventsPage.itemsPerPage;
  }

  async getEndedEvents() {
    const events = await this.core.getEvents(this.eventsPage, {
      status: 'ENDED',
      status_type: '=',
      sortBy: 'startAt',
      sortType: 'desc',
      withSummary: true,
      withResult: true,
    });
    return events;
  }

  async loadMoreEvents(event: Event) {
    this.eventsPage.currentPage += 1;
    const incoming = await this.getEndedEvents();
    this.events = [...this.events, ...incoming];
    this.eventsEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

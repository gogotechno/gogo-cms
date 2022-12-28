import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage extends SharedComponent implements OnInit {
  eventsPage: Pagination;
  eventsEnded: boolean;
  events: JJEvent[];
  updatedAt: Date;

  constructor(private menuCtrl: MenuController, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.eventsPage = this.defaultPage;
    this.events = await this.getEvents();
    this.eventsEnded = this.events.length < this.eventsPage.itemsPerPage;
  }

  async getEvents() {
    let events = await this.core.getEvents(this.eventsPage);
    this.updatedAt = new Date();
    return events;
  }

  async loadMoreEvents(event: Event) {
    this.eventsPage.currentPage += 1;
    let incoming = await this.getEvents();
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

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }
}

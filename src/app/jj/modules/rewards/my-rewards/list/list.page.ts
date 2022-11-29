import { Component, OnInit } from '@angular/core';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent, JJTicketDistribution } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  segmentButtons = segmentButtons;
  segmentCode: SegmentCode = 'rewards';

  eventsPage: Pagination;
  eventsEnded: boolean;
  events: JJEvent[];
  selectedEvent: JJEvent;

  distributionsPage: Pagination;
  distributionsEnded: boolean;
  distributions: JJTicketDistribution[];

  constructor(private auth: AuthService, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.eventsPage = this.distributionsPage = this.defaultPage;
    this.events = await this.getEvents();
    if (this.events.length) {
      this.selectedEvent = this.events[0];
      this.distributions = await this.getDistributions();
      this.distributionsEnded = this.distributions.length < this.distributionsPage.itemsPerPage;
    }
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async getEvents() {
    let events = await this.auth.findMyJoinedEvents(this.eventsPage);
    return events;
  }

  async getDistributions() {
    let distributions = await this.core.getTicketDistributions(this.distributionsPage, {
      customer_id: this.auth.currentUser.doc_id,
      customer_id_type: '=',
      event_id: this.selectedEvent.doc_id,
      event_id_type: '=',
    });
    return distributions;
  }

  async loadMoreEvents(event: Event) {
    if (this.eventsEnded) {
      return;
    }
    let el = <HTMLDivElement>event.target;
    let target = el.scrollWidth - el.offsetWidth;
    if (Math.ceil(el.scrollLeft) == target) {
      this.eventsPage.currentPage += 1;
      let incoming = await this.getEvents();
      this.events = [...this.events, ...incoming];
      this.eventsEnded = incoming.length <= 0;
    }
  }

  async loadMoreDistributions(event: Event) {
    this.distributionsPage.currentPage += 1;
    let incoming = await this.getDistributions();
    this.distributions = [...this.distributions, ...incoming];
    this.distributionsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async onEventClick(event: JJEvent) {
    if (this.selectedEvent.doc_id == event.doc_id) {
      return;
    }
    this.selectedEvent = event;
    this.distributionsEnded = false;
    this.distributionsPage = this.defaultPage;
    this.distributions = await this.getDistributions();
  }

  showDistributionDate(index: number) {
    if (index == 0) {
      return true;
    }
    let previous = this.distributions[index - 1];
    let current = this.distributions[index];
    let previousDate = new Date(previous.distributedAt).toDateString();
    let currentDate = new Date(current.distributedAt).toDateString();
    return previousDate != currentDate;
  }
}

type SegmentCode = 'rewards' | 'prizes';
interface SegmentButton {
  code: SegmentCode;
  label: string;
}

const segmentButtons: SegmentButton[] = [
  {
    code: 'rewards',
    label: 'jj._REWARDS',
  },
  {
    code: 'prizes',
    label: 'jj._PRIZES',
  },
];

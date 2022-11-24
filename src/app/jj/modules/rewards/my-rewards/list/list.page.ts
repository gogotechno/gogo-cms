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

  eventPage: Pagination;
  eventsEnded: boolean;
  events: JJEvent[];
  selectedEvent: JJEvent;

  distributionPage: Pagination;
  distributionsEnded: boolean;
  distributions: JJTicketDistribution[];

  constructor(private auth: AuthService, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    this.eventPage = this.distributionPage = this.defaultPage;

    this.events = await this.getEvents();

    if (this.events.length) {
      this.selectedEvent = this.events[0];
      this.distributions = await this.getDistributions();
    }
  }

  async getEvents() {
    let events = await this.auth.findMyJoinedEvents(this.eventPage);
    return events;
  }

  async getDistributions() {
    let distributions = await this.core.getTicketDistributions(this.distributionPage, {
      customer_id: this.auth.currentUser.doc_id,
      customer_id_type: '=',
      event_id: this.selectedEvent.doc_id,
      event_id_type: '=',
    });
    return distributions;
  }

  async loadMoreEvents(event: Event) {
    this.eventPage.currentPage += 1;
    let incoming = await this.getEvents();
    this.events = [...this.events, ...incoming];
    this.eventsEnded = incoming.length <= 0;

    (<HTMLIonInfiniteScrollElement>event.target).complete();
  }

  async loadMoreDistributions(event: Event) {
    this.distributionPage.currentPage += 1;
    let incoming = await this.getDistributions();
    this.distributions = [...this.distributions, ...incoming];
    this.distributionsEnded = incoming.length <= 0;

    (<HTMLIonInfiniteScrollElement>event.target).complete();
  }

  async onEventClick(event: JJEvent) {
    this.selectedEvent = event;
    this.distributionPage = this.defaultPage;
    this.distributions = await this.getDistributions();
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

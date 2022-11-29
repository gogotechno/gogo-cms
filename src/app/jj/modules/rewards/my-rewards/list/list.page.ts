import { Component, OnInit } from '@angular/core';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent, JJTicketDistribution, JJWinner, User } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  segmentButtons = segmentButtons;
  segmentCode: SegmentCode;

  currentUser: User;

  eventsPage: Pagination;
  eventsEnded: boolean;
  events: JJEvent[];
  selectedEvent: JJEvent;

  distributionsPage: Pagination;
  distributionsEnded: boolean;
  distributionsLoading: boolean;
  distributions: JJTicketDistribution[];

  winnersPage: Pagination;
  winnersEnded: boolean;
  winners: JJWinner[];

  constructor(private auth: AuthService, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    this.currentUser = this.auth.currentUser;
    this.segmentCode = 'rewards';
    await this.loadEvents();
  }

  async loadEvents() {
    this.eventsPage = this.distributionsPage = this.defaultPage;
    this.events = await this.getEvents();
    this.eventsEnded = this.events.length < this.eventsPage.itemsPerPage;
    if (this.events.length) {
      this.selectedEvent = this.events[0];
      this.distributions = await this.getDistributions();
      this.distributionsEnded = this.distributions.length < this.distributionsPage.itemsPerPage;
    }
  }

  async loadWinners() {
    this.winnersPage = this.defaultPage;
    this.winners = await this.getWinners();
    this.winnersEnded = this.winners.length < this.winnersPage.itemsPerPage;
  }

  async doRefresh(event: Event) {
    switch (this.segmentCode) {
      case 'prizes':
        await this.loadWinners();
        break;
      default:
        await this.loadEvents();
        break;
    }
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async getEvents() {
    let events = await this.auth.findMyJoinedEvents(this.eventsPage);
    return events;
  }

  async getDistributions() {
    let distributions = await this.core.getTicketDistributions(this.distributionsPage, {
      customer_id: this.currentUser.doc_id,
      customer_id_type: '=',
      event_id: this.selectedEvent.doc_id,
      event_id_type: '=',
    });
    return distributions;
  }

  async getWinners() {
    let winners = await this.core.getWinners(this.winnersPage, {
      customerId: this.currentUser.doc_id,
    });
    return winners;
  }

  async loadMoreEvents(event: Event) {
    if (this.eventsEnded) {
      return;
    }
    let el = <HTMLDivElement>event.target;
    let target = el.scrollWidth - el.offsetWidth;
    if (Math.ceil(el.scrollLeft) == target) {
      this.distributionsLoading = true;
      this.eventsPage.currentPage += 1;
      let incoming = await this.getEvents();
      this.events = [...this.events, ...incoming];
      this.eventsEnded = incoming.length <= 0;
      this.distributionsLoading = false;
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

  async loadMoreWinners(event: Event) {
    this.winnersPage.currentPage += 1;
    let incoming = await this.getWinners();
    this.winners = [...this.winners, ...incoming];
    this.winnersEnded = incoming.length <= 0;
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

  async onSegmentChange(event?: Event) {
    switch (this.segmentCode) {
      case 'prizes':
        if (!this.winners?.length) {
          await this.loadWinners();
        }
        break;
      default:
        if (!this.events?.length) {
          await this.loadEvents();
        }
        break;
    }
  }

  getWinnerStatusColor(status: 'PENDING' | 'DELIVERED') {
    switch (status) {
      case 'DELIVERED':
        return 'success';
      default:
        return 'medium';
    }
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

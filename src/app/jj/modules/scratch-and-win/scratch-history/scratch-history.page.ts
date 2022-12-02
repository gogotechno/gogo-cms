import { Component, OnInit } from '@angular/core';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJScratchAndWinEvent, JJScratchRequest } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-scratch-history',
  templateUrl: './scratch-history.page.html',
  styleUrls: ['./scratch-history.page.scss'],
})
export class ScratchHistoryPage extends SharedComponent implements OnInit {
  eventId: number;
  event: JJScratchAndWinEvent;

  requestsPage: Pagination;
  requestsEnded: boolean;
  requests: JJScratchRequest[];

  constructor(private auth: AuthService, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    this.eventId = 1; //DEMO ONLY
    await this.loadData();
  }

  async loadData() {
    this.event = await this.core.getScratchAndWinEventById(this.eventId);
    this.requestsPage = this.defaultPage;
    this.requests = await this.getRequests();
    this.requestsEnded = this.requests.length < this.requestsPage.itemsPerPage;
  }

  async getRequests() {
    let currentUser = this.auth.currentUser;
    let requests = await this.core.getScratchRequests(this.requestsPage, {
      hasPrize: true,
      customer_id: currentUser.doc_id,
      customer_id_type: '=',
    });
    return requests;
  }

  async loadMoreRequests(event: Event) {
    this.requestsPage.currentPage += 1;
    let incoming = await this.getRequests();
    this.requests = [...this.requests, ...incoming];
    this.requestsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  showRequestDate(index: number) {
    if (index == 0) {
      return true;
    }
    let previous = this.requests[index - 1];
    let current = this.requests[index];
    let previousDate = new Date(previous.doc_createdBy).toDateString();
    let currentDate = new Date(current.doc_createdBy).toDateString();
    return previousDate != currentDate;
  }
}

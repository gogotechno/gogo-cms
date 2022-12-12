import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private auth: AuthService, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.eventId = params['id'];
    await this.loadData();
  }

  async loadData() {
    if (this.auth.userType == 'CUSTOMER') {
      this.event = await this.core.getScratchAndWinEventById(this.eventId);
      this.requestsPage = this.defaultPage;
      this.requests = await this.getRequests();
      this.requestsEnded = this.requests.length < this.requestsPage.itemsPerPage;
    } else {
      this.requests = [];
      this.requestsEnded = true;
    }
  }

  async getRequests() {
    let currentUser = this.auth.currentUser;
    let requests = await this.core.getScratchRequests(this.requestsPage, {
      hasPrize: true,
      eventId: this.eventId,
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

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

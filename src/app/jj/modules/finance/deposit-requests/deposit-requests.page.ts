import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFilter } from 'src/app/cms.type';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { DepositRequestStatus, JJDepositRequest } from 'src/app/jj/typings';
import { Conditions, Pagination } from 'src/app/sws-erp.type';
import { FilterComponent } from './@components/filter/filter.component';

@Component({
  selector: 'app-deposit-requests',
  templateUrl: './deposit-requests.page.html',
  styleUrls: ['./deposit-requests.page.scss'],
})
export class DepositRequestsPage extends SharedComponent implements OnInit {
  updatedAt: Date;
  requestsPage: Pagination;
  requestsEnded: boolean;
  requests: JJDepositRequest[][];
  requestsConditions: RequestsConditions;

  filter: CmsFilter;

  constructor(private date: DatePipe, private modalCtrl: ModalController, private core: CoreService) {
    super();
  }

  get dates(): string[] {
    if (!this.requests) {
      return null;
    }
    return Object.keys(this.requests);
  }

  async ngOnInit() {
    this.filter = this._filter;
    this.requestsConditions = this._conditions;
    await this.loadData();
  }

  async loadData() {
    this.requests = [];
    this.requestsPage = this.defaultPage;
    const requests = await this.getRequests();
    this.grouping(requests);
    this.requestsEnded = requests.length < this.requestsPage.itemsPerPage;
  }

  async getRequests() {
    const requests = await this.core.getDepositRequests(this.requestsPage, this.requestsConditions);
    this.updatedAt = new Date();
    return requests;
  }

  async loadMoreRequests(event: Event) {
    this.requestsPage.currentPage += 1;
    const incoming = await this.getRequests();
    this.grouping(incoming);
    this.requestsEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  grouping(requests: JJDepositRequest[]) {
    if (!this.requests) {
      this.requests = [];
    }
    requests.forEach((transaction) => {
      const date = this.date.transform(transaction.doc_createdDate, 'd/M/yyyy');
      let list = this.requests[date];
      if (list === undefined) {
        list = [transaction];
      } else {
        list.push(transaction);
      }
      this.requests[date] = list;
    });
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      componentProps: {
        filter: this.filter,
        conditions: this.requestsConditions,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data?.needRefresh) {
      this.requestsPage = this.defaultPage;
      this.requestsConditions = data.conditions || this._conditions;
      this.requests = [];
      const incoming = await this.getRequests();
      this.grouping(incoming);
    }
  }

  getStatusColor(request: JJDepositRequest) {
    switch (request.status) {
      case 'DECLINED':
        return 'danger';
      case 'APPROVED':
        return 'success';
      case 'PROCESSING':
        return 'warning';
      default:
        return 'medium';
    }
  }

  get _filter(): CmsFilter {
    return {
      labelPosition: 'stacked',
      disallowEmpty: true,
      items: [
        {
          code: 'status',
          label: '_STATUS',
          type: 'select',
          options: [
            {
              code: 'PENDING_PAYMENT',
              label: 'jj._PENDING_PAYMENT',
            },
            {
              code: 'PROCESSING',
              label: 'jj._PROCESSING',
            },
            {
              code: 'APPROVED',
              label: 'jj._APPROVED',
            },
            {
              code: 'DECLINED',
              label: 'jj._DECLINED',
            },
          ],
        },
      ],
    };
  }

  get _conditions(): RequestsConditions {
    return {
      status: 'PROCESSING',
    };
  }
}

export interface RequestsConditions extends Conditions {
  status?: DepositRequestStatus;
}

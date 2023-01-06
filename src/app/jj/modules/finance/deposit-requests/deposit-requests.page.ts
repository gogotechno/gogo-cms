import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsFilter } from 'src/app/cms.type';
import { CommonService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { DepositRequestStatus, JJDepositRequest } from 'src/app/jj/typings';
import { Conditions, Pagination } from 'src/app/sws-erp.type';
import { WalletsService } from '../../wallets/wallets.service';
import { FinanceService } from '../finance.service';
import { FilterComponent } from './@components/filter/filter.component';

@Component({
  selector: 'app-deposit-requests',
  templateUrl: './deposit-requests.page.html',
  styleUrls: ['./deposit-requests.page.scss'],
})
export class DepositRequestsPage extends SharedComponent implements OnInit {
  backButtonText: string;
  updatedAt: Date;
  requestsPage: Pagination;
  requestsEnded: boolean;
  requests: JJDepositRequest[][];
  requestsConditions: RequestsConditions;
  filter: CmsFilter;

  initialized: boolean;
  destroy$: Subject<boolean>;

  constructor(
    private date: DatePipe,
    private modalCtrl: ModalController,
    private core: CoreService,
    private common: CommonService,
    private walletsService: WalletsService,
    private financeService: FinanceService,
  ) {
    super();
    this.destroy$ = new Subject();
  }

  get dates(): string[] {
    if (!this.requests) {
      return null;
    }
    return Object.keys(this.requests);
  }

  async ngOnInit() {
    this.filter = this._filter;
    this.backButtonText = await this.common.getBackButtonText();
    this.requestsConditions = this._conditions;
    this.financeService.depositChange.pipe(takeUntil(this.destroy$)).subscribe(async (change) => {
      if (change && this.initialized) {
        await this.loadData(true);
      }
    });
    await this.loadData(false);
    this.initialized = true;
  }

  async loadData(silent: boolean) {
    this.requests = [];
    this.requestsPage = this.defaultPage;
    const requests = await this.getRequests(silent);
    this.grouping(requests);
    this.requestsEnded = requests.length < this.requestsPage.itemsPerPage;
  }

  async getRequests(silent: boolean) {
    let conditions = {
      skipLoading: silent,
      ...this.requestsConditions,
    };
    const requests = await this.core.getDepositRequests(this.requestsPage, conditions);
    this.updatedAt = new Date();
    return requests;
  }

  async loadMoreRequests(event: Event) {
    this.requestsPage.currentPage += 1;
    const incoming = await this.getRequests(false);
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
    await this.loadData(false);
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
    if (data?.needRefresh) {
      this.requestsPage = this.defaultPage;
      this.requestsConditions = data.conditions || this._conditions;
      this.requests = [];
      const incoming = await this.getRequests(false);
      this.grouping(incoming);
    }
  }

  getStatusColor(request: JJDepositRequest) {
    return this.walletsService.getStatusColor(request.status);
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

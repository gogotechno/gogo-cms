import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFilter, Operator } from 'src/app/cms.type';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJTicket, JJTicketDistribution } from '../../jj-luckydraw.type';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.page.html',
  styleUrls: ['./ticket-history.page.scss'],
})
export class TicketHistoryPage implements OnInit {

  loaded: boolean;
  distributionPagination: Pagination;
  distributions: JJTicketDistribution[];
  noMoreDistributions: boolean;

  distributionConditions: {
    searchInput?: string;
    event_id?: number;
    event_id_type?: Operator;
    distributedAt_from?: Date;
    distributedAt_to?: Date;
  };

  filter: CmsFilter;
  customerId: number;

  constructor(private lucky: JJLuckydrawService, private modalCtrl: ModalController) {
    // this.lucky.distributionsChange.subscribe((ev) => {
    //   if (ev?.beUpdated) {
    //     this.loadData();
    //   }
    // })
  }

  async ngOnInit() {
    this.filter = this.filterInitialization;
    this.distributionConditions = {};
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreDistributions = false;
    this.customerId = await this.lucky.getCustomerId();
    await this.loadTicketDistributions();
    this.loaded = true;
  }

  resetPagination() {
    this.distributionPagination = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  getTicketDistributions() {
    return this.lucky.getTicketDistributions({
      ...this.distributionConditions,
      event_id_type: '=',
      customer_id: this.customerId,
      customer_id_type: '='
    }, this.distributionPagination);
  }

  async loadTicketDistributions() {
    this.resetPagination();
    this.distributions = await this.getTicketDistributions();
    this.noMoreDistributions = this.distributions.length < this.distributionPagination.itemsPerPage;
  }

  async loadMoreTicketDistributions(event: Event) {
    const infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.distributionPagination.currentPage += 1;
    const distributions = await this.getTicketDistributions();
    this.distributions = [...this.distributions, ...distributions];
    this.noMoreDistributions = distributions.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    const refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onFilter() {
    const modal = await this.modalCtrl.create({
      component: TicketFilterComponent,
      componentProps: {
        filter: this.filter,
        conditions: this.distributionConditions
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.needRefresh) {
      this.resetPagination();
      this.distributionConditions = data.conditions;
      this.distributions = await this.getTicketDistributions();
    }
  }

  get filterInitialization(): CmsFilter {
    return {
      items: [
        {
          code: 'event_id',
          label: {
            en: 'Event',
            zh: '抽奖活动'
          },
          type: 'select',
          searchable: true,
          selectConfig: {
            labelFields: ['name'],
            codeFields: ['doc_id']
          },
          selectHandler: {
            onLoad: async () => {
              const pagination: Pagination = { itemsPerPage: 10, currentPage: 1 };
              const events = await this.lucky.getEvents({}, pagination);
              return [events, pagination];
            },
            onScrollToEnd: async (pagination: Pagination) => {
              const events = await this.lucky.getEvents({}, pagination);
              return [events, pagination];
            }
          }
        },
        {
          code: 'distributedAt',
          label: {
            en: 'Distributed At',
            zh: '分发于'
          },
          type: 'date-between'
        }
      ]
    };
  }

}

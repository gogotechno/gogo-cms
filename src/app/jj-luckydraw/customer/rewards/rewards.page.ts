import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFilter, Operator } from 'src/app/cms.type';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJWinner } from '../../jj-luckydraw.type';
import { TicketFilterComponent } from '../ticket-history/ticket-filter/ticket-filter.component';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {
  loaded: boolean;
  rewardPagination: Pagination;
  rewards: JJWinner[];
  noMoreRewards: boolean;

  rewardConditions: {
    searchInput?: string;
    event_id?: number;
    event_id_type?: Operator;
    distributedAt_from?: Date;
    distributedAt_to?: Date;
  };

  filter: CmsFilter;
  customerId: number;

  constructor(private lucky: JJLuckydrawService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    this.filter = this.filterInitialization;
    this.rewardConditions = {};
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreRewards = false;
    this.customerId = await this.lucky.getCustomerId();
    await this.loadRewards();
    this.loaded = true;
  }

  resetPagination() {
    this.rewardPagination = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  getRewards() {
    return this.lucky.getRewards(
      {
        ...this.rewardConditions,
      },
      this.rewardPagination
    );
  }

  async loadRewards() {
    this.resetPagination();
    this.rewards = await this.getRewards();
    this.noMoreRewards = this.rewards.length < this.rewardPagination.itemsPerPage;
  }

  async loadMoreRewards(event: Event) {
    let infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.rewardPagination.currentPage += 1;
    let rewards = await this.getRewards();
    this.rewards = [...this.rewards, ...rewards];
    this.noMoreRewards = rewards.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onSearch(event: Event) {
    let searchbarEl = <HTMLIonSearchbarElement>event.target;
    this.resetPagination();
    this.rewardConditions['searchInput'] = searchbarEl.value;
    this.rewards = await this.getRewards();
  }

  async onFilter() {
    const modal = await this.modalCtrl.create({
      component: TicketFilterComponent,
      componentProps: {
        filter: this.filter,
        conditions: this.rewardConditions,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.needRefresh) {
      this.resetPagination();
      this.rewardConditions = data.conditions;
      this.rewards = await this.getRewards();
    }
  }

  get filterInitialization(): CmsFilter {
    return {
      items: [
        {
          code: 'dr.event_id',
          label: {
            en: 'Event',
            zh: '抽奖活动',
          },
          type: 'select',
          searchable: true,
          selectConfig: {
            labelFields: ['name'],
            codeFields: ['doc_id'],
          },
          selectHandler: {
            onLoad: async () => {
              let pagination: Pagination = { itemsPerPage: 10, currentPage: 1 };
              let events = await this.lucky.getEvents({}, pagination);
              return [events, pagination];
            },
            onScrollToEnd: async (pagination: Pagination) => {
              let events = await this.lucky.getEvents({}, pagination);
              return [events, pagination];
            },
          },
        },
        {
          code: 'drewAt',
          label: {
            en: 'Drew At',
            zh: '抽奖于',
          },
          type: 'date-between',
        },
      ],
    };
  }

  badgeColor(status: 'PENDING' | 'DELIVERED') {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'DELIVERED':
        return 'success';
    }
  }
}

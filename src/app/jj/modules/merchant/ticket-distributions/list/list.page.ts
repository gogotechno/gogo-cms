import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { CmsFilter, Operator } from 'src/app/cms.type';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJTicketDistribution } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';
import { ListFilterComponent } from './@components/list-filter/list-filter.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  distributionsPage: Pagination;
  distributionsEnded: boolean;
  distributions: JJTicketDistribution[];
  distributionsConditions: {
    searchInput?: string;
    event_id?: number;
    event_id_type?: Operator;
    distributedAt_from?: Date;
    distributedAt_to?: Date;
  };

  filter: CmsFilter;

  merchantId: number;

  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private core: CoreService,
    private modalCtrl: ModalController,
  ) {
    super();
  }

  async ngOnInit() {
    this.filter = this._filter;
    this.distributionsConditions = {};
    await this.loadData();
  }

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }

  async loadData() {
    this.distributionsEnded = false;
    this.merchantId = await this.auth.findMyMerchantId();
    await this.loadTicketDistributions();
  }

  getTicketDistributions() {
    return this.core.getTicketDistributions(this.distributionsPage, {
      merchant_id: this.merchantId,
      merchant_id_type: '=',
      event_id_type: '=',
      sortBy: 'distributedAt',
      sortType: 'desc',
      ...this.distributionsConditions,
    });
  }

  async loadTicketDistributions() {
    this.distributionsPage = this.defaultPage;
    this.distributions = await this.getTicketDistributions();
    this.distributionsEnded = this.distributions.length < this.distributionsPage.itemsPerPage;
  }

  async loadMoreTicketDistributions(event: Event) {
    this.distributionsPage.currentPage += 1;
    const incoming = await this.getTicketDistributions();
    this.distributions = [...this.distributions, ...incoming];
    this.distributionsEnded = incoming.length <= 0;
    const scoller = <HTMLIonInfiniteScrollElement>event.target;
    scoller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onSearch(event: Event) {
    const searchbar = <HTMLIonSearchbarElement>event.target;
    this.distributionsPage = this.defaultPage;
    this.distributionsConditions.searchInput = searchbar.value;
    this.distributions = await this.getTicketDistributions();
  }

  async onFilter() {
    const modal = await this.modalCtrl.create({
      component: ListFilterComponent,
      componentProps: {
        filter: this.filter,
        conditions: this.distributionsConditions,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.needRefresh) {
      this.distributionsPage = this.defaultPage;
      this.distributionsConditions = data.conditions;
      this.distributions = await this.getTicketDistributions();
    }
  }

  get _filter(): CmsFilter {
    return {
      labelPosition: 'stacked',
      items: [
        {
          code: 'event_id',
          label: {
            en: 'Event',
            zh: '抽奖活动',
            ms: 'Acara',
          },
          type: 'select',
          searchable: true,
          selectConfig: {
            labelFields: ['name'],
            codeFields: ['doc_id'],
          },
          selectHandler: {
            onLoad: async () => {
              const pagination: Pagination = this.defaultPage;
              const events = await this.core.getEvents(pagination);
              return [events, pagination];
            },
            onScrollToEnd: async (pagination: Pagination) => {
              const events = await this.core.getEvents(pagination);
              return [events, pagination];
            },
          },
        },
        {
          code: 'distributedAt',
          label: {
            en: 'Distributed At',
            zh: '分发于',
            ms: 'Diedarkan Di',
          },
          type: 'date-between',
        },
      ],
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFilter } from 'src/app/cms.type';
import { Pagination } from 'src/app/sws-erp.type';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJTicketDistribution } from '../../jj-luckydraw.type';
import { DistributionFilterComponent } from './distribution-filter/distribution-filter.component';

@Component({
  selector: 'app-ticket-distributions',
  templateUrl: './ticket-distributions.page.html',
  styleUrls: ['./ticket-distributions.page.scss'],
})
export class TicketDistributionsPage implements OnInit {

  loaded: boolean;
  distributionPagination: Pagination;
  distributions: JJTicketDistribution[];
  noMoreDistributions: boolean;

  distributionConditions: {
    searchInput?: string
  }

  filter: CmsFilter;

  constructor(private lucky: JJLuckydrawService, private modalCtrl: ModalController) {
    this.distributionConditions = {};
    this.lucky.distributionsChange.subscribe((ev) => {
      if (ev?.beUpdated) {
        this.loadData();
      }
    })
  }

  async ngOnInit() {
    this.filter = this.filterInitialization;
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreDistributions = false;
    await this.loadTicketDistributions();
    this.loaded = true;
  }

  resetPagination() {
    this.distributionPagination = {
      itemsPerPage: 10,
      currentPage: 1
    }
  }

  getTicketDistributions() {
    return this.lucky.getTicketDistributions(this.distributionConditions, this.distributionPagination);
  }

  async loadTicketDistributions() {
    this.resetPagination();
    this.distributions = await this.getTicketDistributions();
    this.noMoreDistributions = this.distributions.length < this.distributionPagination.itemsPerPage;
  }

  async loadMoreTicketDistributions(event: Event) {
    let infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.distributionPagination.currentPage += 1;
    let distributions = await this.getTicketDistributions();
    this.distributions = [...this.distributions, ...distributions];
    this.noMoreDistributions = distributions.length <= 0;
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
    this.distributionConditions["searchInput"] = searchbarEl.value;
    this.distributions = await this.getTicketDistributions();
  }

  async onFilter() {
    const modal = await this.modalCtrl.create({
      component: DistributionFilterComponent,
      componentProps: {
        filter: this.filter,
        conditions: this.distributionConditions
      }
    })
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
          code: "event_id",
          label: {
            en: "Event",
            zh: "抽奖活动"
          },
          type: "select",
          searchable: true,
          selectConfig: {
            labelFields: ["name"],
            codeFields: ["doc_id"]
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
            }
          }
        },
        {
          code: "distributedAt",
          label: {
            en: "Distributed At",
            zh: "分发于"
          },
          type: "date-between"
        }
      ]
    }
  }

}

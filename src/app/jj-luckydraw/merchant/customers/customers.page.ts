import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pagination } from 'src/app/sws-erp.type';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJCustomer, JJUser } from '../../jj-luckydraw.type';
import { CreateUserPage } from '../create-user/create-user.page';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  loaded: boolean;
  me: JJUser | JJCustomer;
  myMerchantId: number;
  customerPagination: Pagination;
  customers: JJCustomer[];
  noMoreCustomers: boolean;
  customerConditions: {
    searchInput?: string;
  };

  constructor(private lucky: JJLuckydrawService, private modalCtrl: ModalController, private auth: AuthService) {
    // this.lucky.customersChange.subscribe((ev) => {
    //   if (ev?.beUpdated) {
    //     this.loadData();
    //   }
    // })
  }

  async ngOnInit() {
    this.me = await this.auth.findMe();
    this.customerConditions = {};
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.noMoreCustomers = false;
    this.myMerchantId = await this.lucky.getMyMerchantId();
    await this.loadCustomers();
    this.loaded = true;
  }

  async loadCustomers() {
    this.resetPagination();
    this.customers = await this.getCustomers();
    this.noMoreCustomers = this.customers.length < this.customerPagination.itemsPerPage;
  }

  getCustomers() {
    return this.lucky.getCustomers(
      {
        ...this.customerConditions,
      },
      this.customerPagination
    );
  }

  async loadMoreCustomers(event: Event) {
    const infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.customerPagination.currentPage += 1;
    const customers = await this.getCustomers();
    this.customers = [...this.customers, ...customers];
    this.noMoreCustomers = customers.length <= 0;
    infiniteScrollEl.complete();
  }

  async doRefresh(event: Event) {
    const refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onSearch(event: Event) {
    const searchbarEl = <HTMLIonSearchbarElement>event.target;
    this.resetPagination();
    this.customerConditions.searchInput = searchbarEl.value;
    this.customers = await this.getCustomers();
  }

  resetPagination() {
    this.customerPagination = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }
}

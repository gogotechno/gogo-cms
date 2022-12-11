import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJCustomer, JJUser } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends SharedComponent implements OnInit {
  currentUser: JJUser;
  customersPage: Pagination;
  customersEnded: boolean;
  customers: JJCustomer[];
  customersConditions: {
    searchInput?: string;
  };

  constructor(private menuCtrl: MenuController, private auth: AuthService, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    this.customersConditions = {};
    this.currentUser = <JJUser>this.auth.currentUser;
    await this.loadData();
  }

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }

  async loadData() {
    this.customersEnded = false;
    this.customersPage = this.defaultPage;
    this.customers = await this.getCustomers();
    this.customersEnded = this.customers.length < this.customersPage.itemsPerPage;
  }

  async getCustomers() {
    let customers = await this.core.getCustomers(this.customersPage, this.customersConditions);
    return customers;
  }

  async loadMoreCustomers(event: Event) {
    this.customersPage.currentPage += 1;
    let incoming = await this.getCustomers();
    this.customers = [...this.customers, ...incoming];
    this.customersEnded = incoming.length <= 0;
    let scoller = <HTMLIonInfiniteScrollElement>event.target;
    scoller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onSearch(event: Event) {
    let searchbar = <HTMLIonSearchbarElement>event.target;
    this.customersPage = this.defaultPage;
    this.customersConditions['searchInput'] = searchbar.value;
    this.customers = await this.getCustomers();
  }
}

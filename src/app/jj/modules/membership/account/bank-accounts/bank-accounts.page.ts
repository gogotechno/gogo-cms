import { Component, OnInit } from '@angular/core';
import { AuthService, CommonService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJBankAccount } from 'src/app/jj/typings';
import { Conditions, Pagination } from 'src/app/sws-erp.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.page.html',
  styleUrls: ['./bank-accounts.page.scss'],
})
export class BankAccountsPage extends SharedComponent implements OnInit {
  backButtonText: string;
  accountsPage: Pagination;
  accounts: JJBankAccount[];
  accountsEnded: boolean;
  updatedAt: Date;
  customerId: number;
  merchantId: number;
  accountId: number;

  constructor(private route: ActivatedRoute, private auth: AuthService, private common: CommonService) {
    super();
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async (queryParams) => {
      if (queryParams.refresh) {
        await this.loadData();
      }
    });
    this.backButtonText = await this.common.getBackButtonText();
    await this.loadData();
  }

  async loadData() {
    this.accountsPage = this.defaultPage;
    this.accounts = await this.getAccounts();
    this.accountsEnded = this.accounts.length < this.accountsPage.itemsPerPage;
  }

  async loadMoreAccounts(event: Event) {
    this.accountsPage.currentPage += 1;
    const incoming = await this.getAccounts();
    this.accounts = [...this.accounts, ...incoming];
    this.accountsEnded = incoming.length <= 0;
    const scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async getAccounts() {
    let accounts = await this.auth.findMyBankAccounts(this.accountsPage);
    this.updatedAt = new Date();
    return accounts;
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

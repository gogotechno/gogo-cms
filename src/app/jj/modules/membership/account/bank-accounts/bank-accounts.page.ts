import { Component, OnInit } from '@angular/core';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJBankAccount } from 'src/app/jj/typings';
import { Conditions, Pagination } from 'src/app/sws-erp.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.page.html',
  styleUrls: ['./bank-accounts.page.scss'],
})
export class BankAccountsPage extends SharedComponent implements OnInit {
  accountsPage: Pagination;
  accounts: JJBankAccount[];
  accountsEnded: boolean;
  updatedAt: Date;
  customerId: number;
  merchantId: number;
  accountId: number

  constructor(
    private auth: AuthService, 
    private core: CoreService, 
    private router: Router,
    private route: ActivatedRoute,) 
    { 
    super(); 
    }

  async ngOnInit() {
    this.route.queryParams.subscribe(async (queryParams) => {
      if (queryParams.refresh) {
        await this.loadData();
        // await this.router.navigate([]);
      }
    });

    await this.loadData();
  }

  async loadData() {
    switch (this.auth.userType) {
      case 'CUSTOMER':
        this.customerId = this.auth.currentUser.doc_id;
        break;
      case 'MERCHANT':
        this.merchantId = await this.auth.findMyMerchantId();
        break;
      default:
        break;
    }
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
    let conditions: Conditions = {};
    if (this.customerId) {
      conditions.customer_id = this.customerId;
    }
    if (this.merchantId) {
      conditions.merchant_id = this.merchantId;
    }
    let accounts = await this.core.getBankAccounts(this.accountsPage, conditions);
    this.updatedAt = new Date();
    return accounts;
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }


}

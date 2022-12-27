import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppUtils } from 'src/app/cms.util';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJBankAccount } from 'src/app/jj/typings';
import { Conditions, Pagination } from 'src/app/sws-erp.type';
import { CreateBankAccountComponent } from '../create-bank-account/create-bank-account.component';

@Component({
  selector: 'app-choose-bank-account',
  templateUrl: './choose-bank-account.component.html',
  styleUrls: ['./choose-bank-account.component.scss'],
})
export class ChooseBankAccountComponent extends SharedComponent implements OnInit {
  accountsPage: Pagination;
  accounts: JJBankAccount[];
  accountsEnded: boolean;
  updatedAt: Date;
  customerId: number;
  merchantId: number;
  selectedBankId: number;

  constructor(
    private modalCtrl: ModalController,
    private appUtils: AppUtils,
    private auth: AuthService,
    private core: CoreService,
  ) {
    super();
  }

  async ngOnInit() {
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
    if (!this.customerId && !this.merchantId) {
      conditions.default = true;
    }
    let accounts = await this.core.getBankAccounts(this.accountsPage, conditions);
    this.updatedAt = new Date();
    return accounts;
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }

  async openCreate() {
    const modal = await this.modalCtrl.create({
      component: CreateBankAccountComponent,
      componentProps: {
        customerId: this.customerId,
        merchantId: this.merchantId,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.account) {
      this.accounts.unshift(data.account);
    }
  }

  async onConfirm() {
    await this.modalCtrl.dismiss({
      bankId: this.selectedBankId,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Conditions } from 'src/app/sws-erp.type';
import { CommonService, CoreService } from '../../services';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  backButtonText: string;
  depositsCount: number;
  withdrawsCount: number;

  constructor(private core: CoreService, private common: CommonService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    await this.loadData();
  }

  async loadData() {
    let conditions: Conditions = {
      status: 'PROCESSING',
      status_type: '=',
    };
    const [depositsCount, withdrawsCount] = await Promise.all([
      this.core.getTotal('Deposit Request', conditions),
      this.core.getTotal('Withdraw Request', conditions),
    ]);
    this.depositsCount = depositsCount;
    this.withdrawsCount = withdrawsCount;
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

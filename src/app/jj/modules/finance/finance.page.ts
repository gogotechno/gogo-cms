import { Component, OnInit } from '@angular/core';
import { Conditions } from 'src/app/sws-erp.type';
import { CoreService } from '../../services';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {
  depositsCount: number;
  withdrawsCount: number;

  constructor(private core: CoreService) {}

  async ngOnInit() {
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
}

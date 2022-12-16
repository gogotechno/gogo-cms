import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwsErpService } from 'src/app/sws-erp.service';

@Component({
  selector: 'app-transfer-receipt',
  templateUrl: './transfer-receipt.page.html',
  styleUrls: ['./transfer-receipt.page.scss'],
})
export class TransferReceiptPage implements OnInit {

  walletNo: string;
  refNo: string;
  transferRequest: any = null;

  readonly status = { en: 'Successful', ms: 'Berjaya', zh: '成功' };
  readonly type = { en: 'Fund Transfer', ms: 'Pemindahan', zh: '现金转账' };

  constructor(
    route: ActivatedRoute,
    private erp: SwsErpService,
  ) {
    this.refNo = route.snapshot.params.refNo;
    this.walletNo = route.snapshot.params.walletNo;
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    const pageResult = await this.erp.getDocs('Transfer Request', { currentPage: 1, itemsPerPage: 1, 'refNo': this.refNo });
    if (pageResult.total === 0) {

    }
    this.transferRequest = pageResult.result[0];
  }

}

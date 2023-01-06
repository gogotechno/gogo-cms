import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CommonService } from 'src/app/jj/services';
import { SwsErpService } from 'src/app/sws-erp.service';

@Component({
  selector: 'app-transfer-receipt',
  templateUrl: './transfer-receipt.page.html',
  styleUrls: ['./transfer-receipt.page.scss'],
})
export class TransferReceiptPage implements OnInit {
  backButtonText: string;
  walletNo: string;
  refNo: string;
  transferRequest: any = null;

  readonly status = { en: 'Successful', ms: 'Berjaya', zh: '成功' };
  readonly type = { en: 'Fund Transfer', ms: 'Pemindahan', zh: '现金转账' };

  constructor(private route: ActivatedRoute, private erp: SwsErpService, private common: CommonService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    this.refNo = this.route.snapshot.params.refNo;
    this.walletNo = this.route.snapshot.params.walletNo;
    await this.loadData();
  }

  async loadData(event?: Event) {
    const pageResult = await this.erp.getDocs('Transfer Request', {
      currentPage: 1,
      itemsPerPage: 1,
      refNo: this.refNo,
    });
    if (pageResult.total === 0) {
    }
    this.transferRequest = pageResult.result[0];
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2pdf from 'html2pdf.js';
import { AppUtils } from 'src/app/cms.util';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJWallet, JJWalletStatementReport } from 'src/app/jj/typings';
import { SwsErpService } from 'src/app/sws-erp.service';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-statement-reports',
  templateUrl: './statement-reports.page.html',
  styleUrls: ['./statement-reports.page.scss'],
})
export class StatementReportsPage extends SharedComponent implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  reportsPage: Pagination;
  reports: JJWalletStatementReport[];
  reportsEnded: boolean;
  updatedAt: Date;

  constructor(
    private route: ActivatedRoute,
    private appUtils: AppUtils,
    private swsErp: SwsErpService,
    private core: CoreService,
  ) {
    super();
  }

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    await this.loadData();
  }

  async loadData() {
    this.wallet = await this.core.getWalletByNo(this.walletNo);
    this.reportsPage = this.defaultPage;
    this.reports = await this.getReports();
    this.reportsEnded = this.reports.length < this.reportsPage.itemsPerPage;
  }

  async getReports() {
    let reports = await this.core.getWalletStatementReports(this.reportsPage, {
      wallet_id: this.wallet.doc_id,
      wallet_id_type: '=',
    });
    this.updatedAt = new Date();
    return reports;
  }

  async loadMoreReports(event: Event) {
    this.reportsPage.currentPage += 1;
    let incoming = await this.getReports();
    this.reports = [...this.reports, ...incoming];
    this.reportsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onReportClick(report: JJWalletStatementReport) {
    let response = await this.swsErp.getPrintTemplate('Wallet Statement Report', [report.doc_id]);
    await this.appUtils.presentLoading();
    let options = {
      margin: 8,
    };
    let worker = html2pdf();
    await worker.set(options).from(response.data.html).toPdf().save(`${report.serialNo}.pdf`);
    await this.appUtils.dismissLoading();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJMerchant } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.page.html',
  styleUrls: ['./merchants.page.scss'],
})
export class MerchantsPage implements OnInit {
  readonly itemsPerPage = 20;
  currentPage = 1;
  merchants$: Promise<JJMerchant[]>;
  backButtonText: string;

  constructor(private core: CoreService, private common: CommonService) {}

  ngOnInit() {
    this.backButtonText = this.common.getBackButtonText();
    this.loadData();
  }

  loadData(event?: Event) {
    let pagination: Pagination = {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };
    this.merchants$ = this.core.getMerchants(pagination, {
      withLocation: true,
    });
  }
}

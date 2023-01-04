import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJMerchant } from 'src/app/jj/typings';

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
    this.merchants$ = this.core.getMerchants(
      { currentPage: this.currentPage, itemsPerPage: this.itemsPerPage },
      { withLocation: true },
    );
  }
}

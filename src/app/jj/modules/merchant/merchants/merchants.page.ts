import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
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

  constructor(
    public platform: Platform,
    private jj: CoreService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(event?: Event) {
    this.merchants$ = this.jj.getMerchants({ currentPage: this.currentPage, itemsPerPage: this.itemsPerPage }, { withLocation: true });
  }

}

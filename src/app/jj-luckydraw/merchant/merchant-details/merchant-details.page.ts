import { Component, OnInit } from '@angular/core';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJMerchant } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.page.html',
  styleUrls: ['./merchant-details.page.scss'],
})
export class MerchantDetailsPage implements OnInit {

  loaded: boolean;
  merchant: JJMerchant;

  constructor(private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.merchant = await this.lucky.getMyMerchant();
    this.loaded = true;
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

}

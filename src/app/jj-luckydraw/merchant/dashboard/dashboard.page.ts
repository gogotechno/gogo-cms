import { Component, OnInit } from '@angular/core';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { Merchant } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  loaded: boolean;
  merchant: Merchant;

  constructor(private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    this.loaded = false;
    this.merchant = await this.lucky.getMyMerchant();
    console.log(this.merchant);
    this.loaded = true;
  }

}

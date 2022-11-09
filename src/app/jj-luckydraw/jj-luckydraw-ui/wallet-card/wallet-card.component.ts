import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { UserType, JJWallet, WalletType } from '../../jj-luckydraw.type';

@Component({
  selector: 'lucky-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
})
export class WalletCardComponent implements OnInit {
  UserType = UserType;

  loaded: boolean;
  role: UserType;
  merchantId: number;
  customerId: number;
  wallet: JJWallet;

  constructor(private auth: AuthService, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    this.loaded = false;
    this.role = this.auth.userRole;
    this.merchantId = await this.lucky.getMyMerchantId();
    this.customerId = (await this.auth.findMe()).doc_id;
    this.wallet = await this.loadWallet();
    this.loaded = true;
  }

  loadWallet() {
    switch (this.role) {
      case UserType.MERCHANT:
        return this.lucky.getWalletByMerchantId(this.merchantId);
      case UserType.CUSTOMER:
        return this.lucky.getWalletByCustomerId(this.customerId);
    }
  }
}

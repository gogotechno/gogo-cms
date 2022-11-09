import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJWallet } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-wallet-qr',
  templateUrl: './wallet-qr.page.html',
  styleUrls: ['./wallet-qr.page.scss'],
})
export class WalletQrPage implements OnInit {
  loaded: boolean;
  qrCodeData: string;
  customerId: number;
  wallet: JJWallet;

  constructor(private auth: AuthService, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    this.loaded = false;
    this.customerId = (await this.auth.findMe()).doc_id;
    this.wallet = await this.lucky.getWalletByCustomerId(this.customerId);
    this.qrCodeData = this.wallet.walletNo;
    this.loaded = true;
  }
}

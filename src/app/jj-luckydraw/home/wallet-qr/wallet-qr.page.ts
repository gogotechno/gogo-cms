import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJWallet, UserType } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-wallet-qr',
  templateUrl: './wallet-qr.page.html',
  styleUrls: ['./wallet-qr.page.scss'],
})
export class WalletQrPage implements OnInit {
  loaded: boolean;
  qrCodeData: string;
  role: UserType;
  wallet: JJWallet;

  constructor(private auth: AuthService, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    this.loaded = false;
    this.role = this.auth.userRole;
    this.wallet = await this.lucky.getMyWallet(this.role);
    this.qrCodeData = this.wallet.walletNo;
    this.loaded = true;
  }
}

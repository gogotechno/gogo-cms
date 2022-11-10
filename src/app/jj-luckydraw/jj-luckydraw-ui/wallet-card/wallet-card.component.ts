import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { UserType, JJWallet } from '../../jj-luckydraw.type';

@Component({
  selector: 'lucky-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
})
export class WalletCardComponent implements OnInit {
  readonly UserType = UserType;
  loaded: boolean;
  role: UserType;
  wallet: JJWallet;

  constructor(private auth: AuthService, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.role = this.auth.userRole;
    this.wallet = await this.lucky.getMyWallet(this.role);
    this.loaded = true;
  }
}

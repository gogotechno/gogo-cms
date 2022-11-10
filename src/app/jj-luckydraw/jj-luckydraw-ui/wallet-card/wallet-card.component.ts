import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthService } from '../../auth.service';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { UserType, JJWallet, WalletType, COMPANY_CODE } from '../../jj-luckydraw.type';

@Component({
  selector: 'lucky-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.scss'],
})
export class WalletCardComponent implements OnInit {
  UserType = UserType;

  loaded: boolean;
  role: UserType;
  wallet: JJWallet;

  constructor(private storage: LocalStorageService, private auth: AuthService, private lucky: JJLuckydrawService) {}

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

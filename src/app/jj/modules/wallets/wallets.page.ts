import { Component, OnDestroy, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services';
import { JJWallet } from '../../typings';
import { WalletsService } from './wallets.service';
import { Currency } from './wallets.types';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.page.html',
  styleUrls: ['./wallets.page.scss'],
})
export class WalletsPage implements OnInit, OnDestroy {
  wallets: JJWallet[] = [];
  totalAssetsBalance = 0;
  updatedAt: Date;

  destroy$: Subject<boolean>;

  constructor(private auth: AuthService, private walletsService: WalletsService) {
    this.destroy$ = new Subject();
  }

  async ngOnInit() {
    this.walletsService.walletsChange = new BehaviorSubject(null);
    this.walletsService.walletsChange.pipe(takeUntil(this.destroy$)).subscribe((change) => {
      if (change) this.refreshData();
    });

    await this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async loadData(event?: Event) {
    this.updatedAt = null;
    this.totalAssetsBalance = 0;
    this.wallets = await this.auth.findMyWallets();
    this.calculateBalance();
    if (event) {
      (<RefresherCustomEvent>event).detail.complete();
    }
    this.updatedAt = new Date();
  }

  calculateBalance() {
    this.totalAssetsBalance = this.wallets.reduce((p, c) => (p += Number(c.walletBalance)), 0);
  }

  async refreshData() {
    this.updatedAt = null;
    this.wallets = await this.auth.findMyWallets({ skipLoading: true });
    this.calculateBalance();
    this.updatedAt = new Date();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJWallet } from 'src/app/jj/typings';
import { QrCodePage } from '../../common/qr-code/qr-code.page';
import { WalletsService } from '../wallets.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit, OnDestroy {
  backButtonText: string;
  walletNo: string;
  wallet: JJWallet;
  cards: WalletCard[];
  initialized: boolean;
  destroy$: Subject<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private walletsService: WalletsService,
    private core: CoreService,
    private common: CommonService,
  ) {
    this.destroy$ = new Subject();
  }

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    this.walletsService.transferSuccess.pipe(takeUntil(this.destroy$)).subscribe((change) => {
      if (change && this.initialized) {
        this.refreshData();
      }
    });
    await this.loadData();
    this.initialized = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async loadData() {
    this.wallet = await this.getWallet(false);
    this.cards = this.getCards();
  }

  async refreshData() {
    this.wallet = await this.getWallet(true);
  }

  async getWallet(silent: boolean) {
    let wallet = await this.core.getWalletByNo(this.walletNo, {
      skipLoading: silent,
    });
    return wallet;
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  onCardClick(card: WalletCard) {
    if (!card.active) {
      return;
    }
    switch (card.code) {
      case 'QR_CODE':
        return this.openQrCode();
      case 'PIN':
        return this.openPin();
      case 'DEPOSIT':
      case 'WITHDRAW':
      case 'TRANSFER':
      case 'STATEMENT':
        return this.onCardNavigate(card.url);
      default:
        return;
    }
  }

  async onCardNavigate(path: string) {
    await this.router.navigate([path], { relativeTo: this.route });
  }

  async openQrCode() {
    const modal = await this.modalCtrl.create({
      component: QrCodePage,
      componentProps: {
        qrData: this.walletNo,
      },
      cssClass: 'qrcode-modal',
    });
    await modal.present();
  }

  async openPin() {
    let verification = await this.walletsService.verifyPin(this.wallet);
    let verified = verification?.success;
    if (!verified) {
      return;
    }
    if (!this.wallet.pin) {
      this.wallet.pin = verification.pin;
    }
    await this.router.navigate(['change-pin'], { relativeTo: this.route });
  }

  getCards() {
    return cards.map((card) => {
      switch (card.code) {
        case 'TRANSFER':
          card.active = this.wallet.walletType?.canTransfer;
          break;
        case 'QR_CODE':
          card.active = this.wallet.walletType?.canPay;
          break;
        case 'DEPOSIT':
          card.active = this.wallet.walletType?.canDeposit;
          break;
        case 'WITHDRAW':
          card.active = this.wallet.walletType?.canWithdraw;
          break;
        case 'STATEMENT':
        case 'PIN':
          card.active = true;
          break;
        default:
          break;
      }
      return card;
    });
  }
}

interface WalletCard {
  code: string;
  name: string;
  icon: string;
  url: string;
  active: boolean;
}

const cards: WalletCard[] = [
  {
    code: 'DEPOSIT',
    name: 'jj._DEPOSIT',
    icon: 'enter-outline',
    url: 'create-deposit',
    active: false,
  },
  {
    code: 'WITHDRAW',
    name: 'jj._WITHDRAW',
    icon: 'exit-outline',
    url: 'create-withdraw',
    active: false,
  },
  {
    code: 'TRANSFER',
    name: 'jj._TRANSFER',
    icon: 'arrow-redo-outline',
    url: 'create-transfer',
    active: false,
  },
  {
    code: 'STATEMENT',
    name: 'jj._STATEMENT',
    icon: 'document-text-outline',
    url: 'statement-reports',
    active: false,
  },
  {
    code: 'PIN',
    name: 'jj._PIN',
    icon: 'keypad-outline',
    url: '',
    active: false,
  },
  {
    code: 'QR_CODE',
    name: 'jj._QR_CODE',
    icon: 'qr-code-outline',
    url: '',
    active: false,
  },
];

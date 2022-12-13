import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { JJWallet } from 'src/app/jj/typings';
import { QrCodePage } from '../../common/qr-code/qr-code.page';
import { CreateDepositPage } from '../create-deposit/create-deposit.page';
import { Currency } from '../wallets.types';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  walletNo: string;
  wallet: JJWallet;
  cards = cards;
  displayCurrency: Currency = {
    code: 'MYR',
    displaySymbol: 'RM',
    precision: 2,
    symbolPosition: 'start',
  };
  createDepositPage: CreateDepositPage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private core: CoreService,
  ) {}

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.walletNo = params['walletNo'];
    this.loadData();
  }

  async loadData() {
    this.wallet = await this.core.getWalletByNo(this.walletNo);
  }

  onCardClick(card: WalletCard) {
    if (!card.active) {
      return;
    }
    switch (card.code) {
      case 'QR_CODE':
        return this.openQrCode();
      case 'DEPOSIT':
      case 'WITHDRAW':
      case 'TRANSFER':
      case 'PIN':
        return this.onCardNavigate(card.url);
      default:
        return;
    }
  }

  async onCardNavigate(path: string) {
    await this.router.navigate([path], {
      relativeTo: this.route,
    });
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
    active: true,
  },
  {
    code: 'WITHDRAW',
    name: 'jj._WITHDRAW',
    icon: 'exit-outline',
    url: 'create-withdraw',
    active: true,
  },
  {
    code: 'TRANSFER',
    name: 'jj._TRANSFER',
    icon: 'arrow-redo-outline',
    url: 'search-phone',
    active: true,
  },
  {
    code: 'STATEMENT',
    name: 'jj._STATEMENT',
    icon: 'document-text-outline',
    url: '',
    active: false,
  },
  {
    code: 'PIN',
    name: 'jj._PIN',
    icon: 'keypad-outline',
    url: 'verify-pin',
    active: true,
  },
  {
    code: 'QR_CODE',
    name: 'jj._QR_CODE',
    icon: 'qr-code-outline',
    url: '',
    active: true,
  },
];

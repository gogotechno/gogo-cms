import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe, FullNamePipe, HideTextPipe } from 'src/app/cms-ui/cms.pipe';
import { Pagination } from 'src/app/sws-erp.type';
import { AuthService, CoreService } from '../../services';
import { CountdownTimer, SharedComponent } from '../../shared';
import {
  JJScratchAndWinEvent,
  JJScratchAndWinPrize,
  JJScratchRequest,
  JJWallet,
  ScratchRequestExtras,
  WalletType,
} from '../../typings';
import { TickerButton } from '../@components/jj-news-ticker/jj-news-ticker.component';
import { ScratchPrizesComponent } from './@components/scratch-prizes/scratch-prizes.component';
import { ScratchResultComponent } from './@components/scratch-result/scratch-result.component';

@Component({
  selector: 'app-scratch-and-win',
  templateUrl: './scratch-and-win.page.html',
  styleUrls: ['./scratch-and-win.page.scss'],
})
export class ScratchAndWinPage extends SharedComponent implements OnInit {
  timer: CountdownTimer;

  eventId: number;
  event: JJScratchAndWinEvent;
  wallet: JJWallet;
  messages: string[];
  totalChance: number;

  buttons = buttons;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private hideText: HideTextPipe,
    private fullName: FullNamePipe,
    private cmsTranslate: CmsTranslatePipe,
    private translate: TranslateService,
    private auth: AuthService,
    private core: CoreService,
  ) {
    super();
    this.totalChance = 0;
    this.timer = this.defaultTimer;
  }

  async ngOnInit() {
    this.eventId = 1; // DEMO ONLY
    await this.loadData();
  }

  async loadData() {
    this.event = await this.core.getScratchAndWinEventById(this.eventId, {
      withLocation: true,
    });

    this.startTimer();

    await this.getWallet();
    await this.getLatestWinners();
  }

  async getWallet() {
    let wallets = await this.auth.findMyWallets();
    this.wallet = wallets.find((wallet) => wallet.type == WalletType.SNW);

    this.totalChance = Math.floor(this.wallet.walletBalance / this.event.pricePerScratch);
  }

  async getLatestWinners() {
    let winnersPage: Pagination = {
      itemsPerPage: 10,
      currentPage: 1,
      sortBy: 'doc_createdDate',
      sortOrder: 'DESC',
    };

    let winners = await this.core.getScratchRequests(winnersPage, {
      hasPrize: true,
    });

    this.messages = await Promise.all(
      winners.map(async (winner) => {
        let customerName = this.fullName.transform(winner.customer.firstName, winner.customer.lastName);
        let hiddenName = this.hideText.transform(customerName);
        let prizeName = this.cmsTranslate.transform(winner.prize.nameTranslation);
        return await this.translate
          .get('jj._SNW_WINNER_ANNOUNCEMENT', {
            name: hiddenName,
            prize: prizeName,
          })
          .toPromise();
      }),
    );
  }

  startTimer() {
    let endDate = new Date(this.event.endAt);
    let interval: number = 1000;
    let timer = setInterval(() => {
      let { time, days, hours, minutes, seconds } = this.getDateDiff(endDate);
      if (time > 0) {
        this.timer = {
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        };
      } else {
        clearInterval(timer);
      }
    }, interval);
  }

  async openPrizes() {
    const modal = await this.modalCtrl.create({
      component: ScratchPrizesComponent,
      componentProps: {
        eventId: this.eventId,
        event: this.event,
      },
    });
    await modal.present();
  }

  async openResult(prize: JJScratchAndWinPrize) {
    const modal = await this.modalCtrl.create({
      component: ScratchResultComponent,
      componentProps: {
        eventId: this.eventId,
        event: this.event,
        prize: prize,
      },
      cssClass: 'scratch-result-modal',
      backdropDismiss: false,
    });
    await modal.present();
  }

  async onScratch() {
    let request: JJScratchRequest = {
      scratch_and_win_event_id: this.eventId,
      customer_id: 17,
      wallet_id: 0,
      spend: 0,
      status: 'PROCESSING',
      scratch_and_win_prize_id: null,
    };
    let res = await this.core.createScratchRequest(request);
    let extras: ScratchRequestExtras = res.data;

    if (extras['prize']) {
      await this.openResult(extras['prize']);
    }

    await this.getWallet();
  }

  async onTickerButtonClick(code: string) {
    switch (code) {
      case 'VIEW_GAME_HISTORY':
        await this.router.navigate([this.eventId, 'scratch-history'], { relativeTo: this.route });
        break;
      default:
        break;
    }
  }
}

const buttons: TickerButton[] = [
  {
    slot: 'end',
    code: 'VIEW_GAME_HISTORY',
    label: 'jj._VIEW_GAME_HISTORY',
  },
];

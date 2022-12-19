import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe, FullNamePipe, HideTextPipe } from 'src/app/cms-ui/cms.pipe';
import { Conditions, Pagination } from 'src/app/sws-erp.type';
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
import { ContentBoxComponent } from '../common/@components/content-box/content-box.component';
import { HomeService as MemberHomeService } from '../membership/home/@services/home.service';
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

  scratching: boolean;

  get contentOffsetTop() {
    let offset = this.platform.is('ios') ? 46 : 56;
    if (this.messages) {
      offset = offset + 20;
    }
    return `${offset}px`;
  }

  constructor(
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private hideText: HideTextPipe,
    private fullName: FullNamePipe,
    private cmsTranslate: CmsTranslatePipe,
    private translate: TranslateService,
    private auth: AuthService,
    private core: CoreService,
    private memberHomeService: MemberHomeService,
  ) {
    super();
    this.totalChance = 0;
    this.timer = this.defaultTimer;
  }

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.eventId = params.id;
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

  async getWallet(conditions: Conditions = {}) {
    let wallets = await this.auth.findMyWallets(conditions);
    this.wallet = wallets.find((wallet) => wallet.type == 'SNW');

    this.totalChance = Math.floor(this.wallet.walletBalance / this.event.pricePerScratch);
    if (this.totalChance < 0) {
      this.totalChance = 0;
    }
  }

  async getLatestWinners(conditions: Conditions = {}) {
    let winnersPage: Pagination = {
      itemsPerPage: 10,
      currentPage: 1,
      sortBy: 'sr.doc_createdDate',
      sortOrder: 'DESC',
    };

    let _conditions: Conditions = {
      eventId: this.eventId,
      hasPrize: true,
      isDefault: false,
      ...conditions,
    };

    let winners = await this.core.getScratchRequests(winnersPage, _conditions);
    this.messages = await Promise.all(
      winners.map(async (winner) => {
        const customerName = this.fullName.transform(winner.customer.firstName, winner.customer.lastName);
        const hiddenName = this.hideText.transform(customerName);
        const prizeName = this.cmsTranslate.transform(winner.prize.nameTranslation);
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
    const endDate = new Date(this.event.endAt);
    const interval = 1000;
    const timer = setInterval(() => {
      const { time, days, hours, minutes, seconds } = this.getDateDiff(endDate);
      if (time > 0) {
        this.timer = {
          days,
          hours,
          minutes,
          seconds,
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
        prize,
      },
      cssClass: 'scratch-result-modal',
      backdropDismiss: false,
    });
    await modal.present();
  }

  async onScratch() {
    if (this.scratching) {
      return;
    }

    this.scratching = true;

    const currentUser = this.auth.currentUser;
    const request: JJScratchRequest = {
      scratch_and_win_event_id: this.eventId,
      customer_id: currentUser.doc_id,
      wallet_id: 0,
      spend: 0,
      status: 'PROCESSING',
      scratch_and_win_prize_id: null,
    };
    const res = await this.core.createScratchRequest(request);
    const extras: ScratchRequestExtras = res.data;
    if (extras.prize) {
      await this.openResult(extras.prize);
    }

    this.getWallet({ skipLoading: true });
    this.getLatestWinners({ skipLoading: true });
    this.memberHomeService.refresh();

    this.scratching = false;
  }

  async onTickerButtonClick(code: string) {
    switch (code) {
      case 'VIEW_GAME_HISTORY':
        await this.router.navigate(['..', this.eventId, 'history'], { relativeTo: this.route });
        break;
      default:
        break;
    }
  }

  async openTnc() {
    const title = await this.translate.get('jj._TERM_AND_CONDITIONS').toPromise();

    const modal = await this.modalCtrl.create({
      component: ContentBoxComponent,
      componentProps: {
        title,
        content: this.event.tnc,
      },
    });

    await modal.present();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

const buttons: TickerButton[] = [
  {
    slot: 'end',
    code: 'VIEW_GAME_HISTORY',
    label: 'jj._VIEW_GAME_HISTORY',
  },
];

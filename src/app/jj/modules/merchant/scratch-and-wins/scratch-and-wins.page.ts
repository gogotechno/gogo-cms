import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService, CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { Pagination } from 'src/app/sws-erp.type';
import { JJScratchAndWinEvent } from 'src/app/jj/typings';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scratch-and-wins',
  templateUrl: './scratch-and-wins.page.html',
  styleUrls: ['./scratch-and-wins.page.scss'],
})
export class ScratchAndWinsPage extends SharedComponent implements OnInit {
  eventsPage: Pagination;
  eventsEnded: boolean;
  events: JJScratchAndWinEvent[];
  merchantId: number;
  updatedAt: Date;

  constructor(
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private auth: AuthService,
    private core: CoreService,
  ) {
    super();
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async (queryParams) => {
      if (queryParams.refresh) {
        await this.loadData();
      }
    });
    await this.loadData();
  }

  async loadData() {
    this.merchantId = await this.auth.findMyMerchantId();
    this.eventsPage = this.defaultPage;
    this.events = await this.getScratchAndWinEvent();
    this.eventsEnded = this.events.length < this.eventsPage.itemsPerPage;
  }

  async getScratchAndWinEvent() {
    let events = await this.core.getScratchAndWinEvents(this.eventsPage, {
      merchant_id: this.merchantId,
      merchant_id_type: '=',
    });
    this.updatedAt = new Date();
    return events;
  }

  async loadMoreEvents(event: Event) {
    this.eventsPage.currentPage += 1;
    let incoming = await this.getScratchAndWinEvent();
    this.events = [...this.events, ...incoming];
    this.eventsEnded = incoming.length <= 0;
    let scroller = <HTMLIonInfiniteScrollElement>event.target;
    scroller.complete();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async openMenu() {
    await this.menuCtrl.enable(true);
    await this.menuCtrl.open();
  }
}

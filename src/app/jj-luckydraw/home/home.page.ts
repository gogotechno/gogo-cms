import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JJLuckydrawService } from '../jj-luckydraw.service';
import { JJEvent } from '../jj-luckydraw.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loaded: boolean;
  lastEndedEvent: JJEvent;
  // destory$: Subject<boolean>;
  // needRefresh: boolean;

  constructor(private lucky: JJLuckydrawService) {
    // this.destory$ = new Subject<boolean>();
  }

  ngOnInit() {
    // this.lucky.walletChange.pipe(takeUntil(this.destory$)).subscribe((ev) => {
    //   this.needRefresh = ev?.beUpdated;
    // });
    this.loadData();
  }

  // ngOnDestroy() {
  //   this.destory$.next(true);
  //   this.destory$.complete();
  // }

  // ionViewWillEnter() {
  //   if (this.needRefresh) {
  //     this.loadData();
  //     this.needRefresh = false;
  //   }
  // }

  async loadData() {
    this.loaded = false;
    this.lastEndedEvent = await this.lucky.getLastDrewEvent();
    this.loaded = true;
  }

  async doRefresh(event: Event) {
    const refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }
}

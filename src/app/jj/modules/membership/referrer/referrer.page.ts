import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { Platform } from '@ionic/angular';

import { Share } from '@capacitor/share';

import { JJCustomer } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { AuthService } from 'src/app/jj/services';

@Component({
  selector: 'app-referrer',
  templateUrl: './referrer.page.html',
  styleUrls: ['./referrer.page.scss'],
})
export class ReferrerPage implements OnInit {

  path = '';
  canShare = false;
  me: JJCustomer | null = null;

  constructor(
    public platform: Platform,
    private auth: AuthService,
    public meta: Meta
  ) {
    console.log(window.location.protocol);
    console.log(window.location.host);
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const canShareResult = await Share.canShare();
    this.canShare = canShareResult.value;
    this.me = await this.auth.findMe() as JJCustomer;
    this.path = `${window.location.protocol}//${window.location.host}/#/jj/register?referrerCode=${this.me.phone}`;
  }

  async share(event?: Event) {
    if (!this.canShare) {
      return;
    }
    const shareResult = await Share.share({
      url: this.path
    });
    console.log(shareResult);
  }

}

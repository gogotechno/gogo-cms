import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { AuthService, CommonService } from 'src/app/jj/services';
import { JJCustomer } from 'src/app/jj/typings';

@Component({
  selector: 'app-referrer',
  templateUrl: './referrer.page.html',
  styleUrls: ['./referrer.page.scss'],
})
export class ReferrerPage implements OnInit {
  backButtonText: string;
  path = '';
  canShare = false;
  me: JJCustomer | null = null;

  constructor(private auth: AuthService, private common: CommonService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    await this.loadData();
  }

  async loadData() {
    const canShareResult = await Share.canShare();
    this.canShare = canShareResult.value;
    this.me = <JJCustomer>await this.auth.findMe();
    this.path = `${window.location.protocol}//${window.location.host}/#/jj/register?referrerCode=${this.me.phone}`;
  }

  async share(event?: Event) {
    if (!this.canShare) {
      return;
    }
    await Share.share({
      url: this.path,
    });
  }
}

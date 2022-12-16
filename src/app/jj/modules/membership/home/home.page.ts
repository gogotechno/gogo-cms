import { Component, OnInit } from '@angular/core';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { AppUtils } from 'src/app/cms.util';
import { CommonService } from 'src/app/jj/services';
import { Bulletin, BulletinGroup, EventConfig, JJEvent, JJFab } from 'src/app/jj/typings';
import { HomeService } from './@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications = 0;
  messages: string[];
  fabs: JJFab[];

  groupCode: string;
  groups: BulletinGroup[];
  bulletins: Bulletin[];
  eventConfig: EventConfig;
  event: JJEvent;

  get showEvent() {
    if (!this.eventConfig) {
      return false;
    }
    if (!this.eventConfig.tags?.length) {
      return true;
    }
    return this.eventConfig.tags.includes(this.groupCode);
  }

  constructor(
    private cmsTranslate: CmsTranslatePipe,
    private appUtils: AppUtils,
    private common: CommonService,
    private home: HomeService,
  ) {}

  async ngOnInit() {
    await this.home.init();
    this.home.initialized = true;
    this.home.event.subscribe((event) => (this.event = event));
    this.home.bulletinGroups.subscribe((groups) => (this.groups = groups));
    this.home.groupCode.subscribe((code) => (this.groupCode = this.groupCode ? this.groupCode : code));
    this.home.bulletins.subscribe((bulletins) => (this.bulletins = bulletins));
    this.home.fabs.subscribe((fabs) => (this.fabs = fabs));
    this.home.announcements.subscribe((announcements) => {
      this.messages = announcements ? announcements.map((announcement) => announcement.message) : null;
    });
  }

  ngOnDestroy() {
    this.home.destroy();
  }

  async doRefresh(event: Event) {
    await this.home.init();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onFabClick(fab: JJFab) {
    await this.common.navigateCustomUrl(fab.url);
  }

  async onBulletinClick(bulletin: Bulletin) {
    if (bulletin.url) {
      await this.common.navigateCustomUrl(bulletin.url);
    }
    if (bulletin.actionUrl) {
      const url = this.common.populateUrl(bulletin.actionUrl);
      await this.common.postByUrl(url, {});
      await this.appUtils.presentAlert(this.cmsTranslate.transform(bulletin.actionSuccessCallback.label));
      this.home.refresh();
    }
  }

  async onBulletinGroupChange(event: Event) {
    const groupCode = String(event);
    document.getElementById('bulletin-group-' + groupCode).scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
    await this.home.filterBulletins(groupCode);
  }
}

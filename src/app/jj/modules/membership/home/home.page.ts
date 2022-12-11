import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/cms.service';
import { CmsTranslation } from 'src/app/cms.type';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJEvent, JJFab } from 'src/app/jj/typings';
import { HomeService } from './@services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications: number = 0;
  messages: string[];
  fabs: JJFab[];

  groupCode: string;
  groups: BulletinGroup[];

  allBulletins: Bulletin[];
  bulletins: Bulletin[];

  event: JJEvent;
  _event: CountdownEvent;

  get showEvent() {
    return this._event.tags.includes(this.groupCode);
  }

  constructor(
    private cms: CmsService,
    private common: CommonService,
    private core: CoreService,
    private home: HomeService,
  ) {}

  async ngOnInit() {
    await this.loadData();
    this.home.fabs.subscribe((fabs) => (this.fabs = fabs));
    this.home.announcements.subscribe((announcements) => {
      if (!announcements) return;
      this.messages = announcements.map((announcement) => announcement.message);
    });
  }

  ngOnDestroy() {
    this.home.destroy();
  }

  async loadData() {
    await this.home.init();

    let url = await this.cms.getDownloadURL('home-directory.json');
    let data = await this.common.getByUrl(url);

    this._event = data['event'];
    if (this._event) {
      this.event = await this.core.getEventById(this._event.id);
    }

    this.groups = data['groups'];
    this.groupCode = this.groups[0].code;

    this.allBulletins = data['bulletins'];
    this.filterBulletins();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

  async onFabClick(fab: JJFab) {
    await this.common.navigateCustomUrl(fab.url);
  }

  filterBulletins() {
    this.bulletins = this.allBulletins.filter((bulletin) => bulletin.tags.includes(this.groupCode));
  }

  async onBulletinClick(bulletin: Bulletin) {
    await this.common.navigateCustomUrl(bulletin.url);
  }

  onBulletinGroupChange(event: Event) {
    document.getElementById('bulletin-group-' + event).scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'nearest',
    });
    this.filterBulletins();
  }
}

interface BulletinGroup {
  code: string;
  label: CmsTranslation;
}

interface Bulletin {
  title: CmsTranslation;
  description: CmsTranslation;
  thumbnailImage: string;
  backgroundImage: string;
  tags: string[];
  cardConfig: {
    backgroundColor: string;
    backgroundColorOpacity: number;
    textColor: string;
  };
  url: string;
}

interface CountdownEvent {
  id: number;
  tags: string[];
}

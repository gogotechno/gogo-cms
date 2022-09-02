import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe } from '../cms-ui/cms.pipe';
import { CmsService } from '../cms.service';
import { CmsList, CmsNavigation, CmsSite } from '../cms.type';
import { Winbox99Service } from './winbox99.service';

@Component({
  selector: 'app-winbox99',
  templateUrl: './winbox99.page.html',
  styleUrls: ['./winbox99.page.scss'],
  providers: [CmsTranslatePipe]
})
export class Winbox99Page implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  lang: string;
  site: CmsSite;
  popupList: CmsList;
  navigation: CmsNavigation;

  constructor(
    private router: Router,
    private cms: CmsService,
    private winbox99: Winbox99Service,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(event => {
      this.lang = event.lang || this.translate.getDefaultLang();
    });

    this.loadData();
  }

  async loadData() {
    await this.winbox99.getAttributes();

    this.site = this.cms.SITE;
    this.lang = this.translate.currentLang || this.translate.getDefaultLang();
    this.navigation = await this.cms.getNavigation('top-nav');
    this.popupList = await this.cms.getList('popups');

    // if (this.popupList) {
    //   this.modal.present();
    // }
  }

  isActive(path: string) {
    let activePath = this.router.url;
    return path === activePath;
  }

  onActivate(event?: Event) {
    console.log(event)
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  async onLanguageChanged(event?: Event) {
    let selected = (<CustomEvent>event).detail.value;
    this.translate.use(selected);
  }

  onWillDismiss(event?: Event) {
    console.log(event);
  }

}

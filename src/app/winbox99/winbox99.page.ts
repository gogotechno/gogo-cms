import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, SelectCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe } from '../cms-ui/cms.pipe';
import { CmsService } from '../cms.service';
import { CmsList, CmsNavigation, CmsSite } from '../cms.type';

@Component({
  selector: 'app-winbox99',
  templateUrl: './winbox99.page.html',
  styleUrls: ['./winbox99.page.scss'],
  providers: [CmsTranslatePipe]
})
export class Winbox99Page implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  navigation: CmsNavigation;
  site: CmsSite;
  selectedLanguage: string;
  popupList: CmsList;

  constructor(private cms: CmsService, private router: Router, private translate: TranslateService, private alertController: AlertController, private cmsTranslate: CmsTranslatePipe) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe(event => {
      this.selectedLanguage = event.lang || this.translate.getDefaultLang();
    });
    this.loadData();
  }

  async loadData() {
    this.site = this.cms.SITE;
    this.selectedLanguage = this.translate.currentLang || this.translate.getDefaultLang();
    this.navigation = await this.cms.getNavigation('top-nav');
    this.popupList = await this.cms.getList('popups');
    if (this.popupList) {
      // this.modal.present();
      // let popupAlert = await this.alertController.create({message: `<img src="${this.cmsTranslate.transform(this.popupList.items[0].thumbnail)}" />`});
      // popupAlert.present();
    }
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

  }

}

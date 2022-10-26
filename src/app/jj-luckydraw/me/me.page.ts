import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppUtils } from 'src/app/cms.util';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AuthService } from '../auth.service';
import { JJLuckydrawService } from '../jj-luckydraw.service';
import { JJCustomer, JJLanguage, JJUser, LANGUAGE_STORAGE_KEY } from '../jj-luckydraw.type';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  loaded: boolean;
  me: JJUser | JJCustomer;

  currentLang: string;
  languages: JJLanguage[];

  profilePicture: string;

  constructor(
    private auth: AuthService,
    private lucky: JJLuckydrawService,
    private translate: TranslateService,
    private storage: LocalStorageService,
    private app: AppUtils
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    let storedLang = await this.storage.get(LANGUAGE_STORAGE_KEY);
    this.currentLang = storedLang || this.translate.currentLang;
    this.languages = await this.lucky.getSupportedLanguages();
    this.me = await this.auth.findMe();
    if ('profilePicture' in this.me) {
      this.profilePicture = this.me.profilePicture;
    }
    this.loaded = true;
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onSignOut(event?: Event) {
    await this.auth.signOut();
  }

  async onLanguageChange() {
    await this.app.presentLoading();
    await this.translate.use(this.currentLang).toPromise();
    await this.storage.set(LANGUAGE_STORAGE_KEY, this.currentLang);
    window.location.reload();
    await this.app.dismissLoading();
  }
}

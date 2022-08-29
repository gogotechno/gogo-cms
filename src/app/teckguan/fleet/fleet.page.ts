import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { i18n } from './i18n';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.page.html',
  styleUrls: ['../teckguan.scss', './fleet.page.scss'],
})
export class FleetPage implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.translate.setTranslation('en', i18n, true);
    console.log(this.translate.translations);
  }

}

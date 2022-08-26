import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currentLang: string;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
  }

}

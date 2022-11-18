import { Component, OnInit } from '@angular/core';
import { AppUtils } from '../cms.util';

@Component({
  selector: 'app-jj',
  templateUrl: './jj.page.html',
  styleUrls: ['./jj.page.scss'],
})
export class JJPage implements OnInit {
  constructor(private app: AppUtils) {}

  async ngOnInit() {
    this.app.loadTemplateTheme('jj');
  }
}

import { Component, OnInit } from '@angular/core';
import { AppUtils } from '../cms.util';

@Component({
  selector: 'app-jj-membership',
  templateUrl: './jj-membership.page.html',
  styleUrls: ['./jj-membership.page.scss'],
})
export class JJMembershipPage implements OnInit {
  constructor(private app: AppUtils) {}

  async ngOnInit() {
    this.app.loadTemplateTheme('jj-membership');
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/jj/services';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  backButtonText: string;

  constructor(private common: CommonService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
  }
}

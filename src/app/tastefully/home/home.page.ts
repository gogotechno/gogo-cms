import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { CmsComponent } from 'src/app/cms.component';
import { CmsService } from 'src/app/cms.service';
import { CmsSlideshow } from 'src/app/cms.type';
import { start_of_day } from 'src/app/cms.util';
import { TastefullyService } from '../tastefully.service';
import { TastefullyCustomer, TastefullyEvent, TastefullyFeed } from '../tastefully.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends CmsComponent implements OnInit {

  readonly CURRENT_CUSTOMER: TastefullyCustomer;

  greetingKey: string;
  slideshow: CmsSlideshow;
  events: TastefullyEvent[];
  feeds: TastefullyFeed[];

  constructor(private cms: CmsService, private tastefully: TastefullyService) {
    super();
    this.CURRENT_CUSTOMER = this.tastefully.CURRENT_CUSTOMER;
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    const today = new Date();
    if (today.getHours() < 12) {
      this.greetingKey = '_GOOD_MORNING';
    } else if (today.getHours() <= 2) {
      this.greetingKey = '_GOOD_AFTERNOON';
    } else {
      this.greetingKey = '_GOOD_EVENING';
    }

    this.slideshow = await this.cms.getSlideshow('home-slideshow');
    this.events = await this.tastefully.getEvents((ref) => ref.where('organisedAt', '>=', start_of_day(this.now)).orderBy('organisedAt', 'desc'));
    this.feeds = await this.tastefully.getFeeds();

    if (event) {
      (<RefresherCustomEvent>event).target.complete();
    }
  }

}

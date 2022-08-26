import { Component, OnInit } from '@angular/core';
import { TastefullyService } from '../../tastefully.service';
import { TastefullyFeed } from '../../tastefully.type';

@Component({
  selector: 'tastefully-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit {

  feeds: TastefullyFeed[];

  constructor(private tastefully: TastefullyService) { }

  async ngOnInit() {
    this.feeds = await this.tastefully.getFeeds();
  }

}

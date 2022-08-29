import { Component, Input, OnInit } from '@angular/core';
import { TastefullyFeed } from '../../tastefully.type';

@Component({
  selector: 'tastefully-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit {

  @Input() feeds: TastefullyFeed[];

  constructor() { }

  ngOnInit() { }

}

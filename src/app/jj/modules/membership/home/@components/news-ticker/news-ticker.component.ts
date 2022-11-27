import { Component, OnInit } from '@angular/core';
import { JJAnnouncement, JJSlideshow } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'news-ticker',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss'],
})
export class NewsTickerComponent implements OnInit {
  announcements: JJAnnouncement[];

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.home.announcements.subscribe((announcements) => {
      this.announcements = announcements;
    });
  }
}

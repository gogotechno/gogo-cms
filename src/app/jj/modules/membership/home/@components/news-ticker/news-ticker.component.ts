import { Component, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';
import { JJAnnouncement } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'news-ticker',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss'],
})
export class NewsTickerComponent extends SharedComponent implements OnInit {
  announcements: JJAnnouncement[];

  constructor(private home: HomeService) {
    super();
  }

  ngOnInit() {
    this.home.announcements.subscribe((announcements) => {
      this.announcements = announcements;
    });
  }

  async onAnimEnd(index: number) {
    let nextIndex = index + 1 == this.announcements.length ? 0 : index + 1;
    let [currentEl, nextEl] = await Promise.all([
      this.assertElement(`message-${index}`),
      this.assertElement(`message-${nextIndex}`),
    ]);
    currentEl.classList.remove('animated');
    nextEl.classList.add('animated');
  }
}

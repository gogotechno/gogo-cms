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

  containerWidth: number;

  constructor(private home: HomeService) {
    super();
  }

  ngOnInit() {
    this.home.announcements.subscribe(async (announcements) => {
      this.announcements = announcements;
      if (this.announcements) {
        const [firstEl, container] = await Promise.all([this.getMessageEl(0), this.getContainerEl()]);
        firstEl.style.setProperty('--offset-end', this.getOffsetEnd(container, firstEl));
        firstEl.style.setProperty('--base-duration', this.getBaseDuration(firstEl));
        firstEl.classList.add('animated');
      }
    });
  }

  async onAnimEnd(index: number) {
    const nextIndex = index + 1 == this.announcements.length ? 0 : index + 1;
    const [currentEl, nextEl, container] = await Promise.all([
      this.getMessageEl(index),
      this.getMessageEl(nextIndex),
      this.getContainerEl(),
    ]);

    nextEl.style.setProperty('--offset-end', this.getOffsetEnd(container, nextEl));
    nextEl.style.setProperty('--base-duration', this.getBaseDuration(nextEl));
    currentEl.classList.remove('animated');
    nextEl.classList.add('animated');
  }

  getMessageEl(index: number) {
    return this.assertElement(`message-${index}`);
  }

  getContainerEl() {
    return this.assertElement('messages-container');
  }

  getOffsetEnd(container: HTMLElement, message: HTMLElement) {
    const span = message.querySelector('span');
    const width = span.offsetWidth < container.offsetWidth ? span.offsetWidth : container.offsetWidth;
    return `${width}px`;
  }

  getBaseDuration(message: HTMLElement) {
    const length = Number(message.style.getPropertyValue('--length'));
    let duration = 0;
    if (length > 1000) {
      duration = 100;
    } else if (length > 50) {
      duration = 200;
    } else if (length > 20) {
      duration = 180;
    } else {
      duration = 500;
    }
    return `${duration}ms`;
  }
}

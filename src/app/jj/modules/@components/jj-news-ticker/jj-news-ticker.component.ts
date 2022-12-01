import { Component, Input, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'jj-news-ticker',
  templateUrl: './jj-news-ticker.component.html',
  styleUrls: ['./jj-news-ticker.component.scss'],
})
export class JjNewsTickerComponent extends SharedComponent implements OnInit {
  @Input('messages') messages: string[];

  constructor() {
    super();
  }

  async ngOnInit() {
    if (this.messages) {
      let [firstEl, container] = await Promise.all([this.getMessageEl(0), this.getContainerEl()]);

      firstEl.style.setProperty('--offset-end', this.getOffsetEnd(container, firstEl));
      firstEl.style.setProperty('--base-duration', this.getBaseDuration(firstEl));
      firstEl.classList.add('animated');
    }
  }

  async onAnimEnd(index: number) {
    let nextIndex = index + 1 == this.messages.length ? 0 : index + 1;
    let [currentEl, nextEl, container] = await Promise.all([
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
    let span = message.querySelector('span');
    let width = span.offsetWidth < container.offsetWidth ? span.offsetWidth : container.offsetWidth;
    return `${width}px`;
  }

  getBaseDuration(message: HTMLElement) {
    let length = Number(message.style.getPropertyValue('--length'));
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'jj-news-ticker',
  templateUrl: './jj-news-ticker.component.html',
  styleUrls: ['./jj-news-ticker.component.scss'],
})
export class JJNewsTickerComponent extends SharedComponent implements OnInit {
  @Input('prefix') prefix: string;
  @Input('messages') messages: string[];
  @Input('buttons') buttons: TickerButton[];

  @Output('onButtonClick') buttonClick: EventEmitter<string>;

  animatedStarted: boolean;
  startButtons: TickerButton[];
  endButtons: TickerButton[];

  constructor() {
    super();
    this.buttonClick = new EventEmitter<string>();
  }

  async ngOnInit() {
    if (this.buttons) {
      this.startButtons = this.buttons.filter((b) => b.slot == 'start');
      this.endButtons = this.buttons.filter((b) => b.slot == 'end');
    }

    if (!this.prefix) {
      throw new Error('Please provide a prefix to prevent duplication');
    }

    await this.startAnim();
  }

  async startAnim() {
    if (!this.messages && this.animatedStarted) {
      return;
    }
    let [firstEl, container] = await Promise.all([this.getMessageEl(0), this.getContainerEl()]);
    firstEl.style.setProperty('--offset-end', this.getOffsetEnd(container, firstEl));
    firstEl.style.setProperty('--base-duration', this.getBaseDuration(firstEl));
    firstEl.classList.add('animated');
    this.animatedStarted = true;
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
    return this.assertElement(`${this.prefix}-message-${index}`);
  }

  getContainerEl() {
    return this.assertElement(`${this.prefix}-messages-container`);
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

  onButtonClick(button: TickerButton) {
    this.buttonClick.emit(button.code);
  }
}

export interface TickerButton {
  slot: 'start' | 'end';
  code: string;
  label: string;
}

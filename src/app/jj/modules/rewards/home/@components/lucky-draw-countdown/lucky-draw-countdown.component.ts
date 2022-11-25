import { Component, Input, OnInit } from '@angular/core';
import { CountdownTimer, SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';

@Component({
  selector: 'lucky-draw-countdown',
  templateUrl: './lucky-draw-countdown.component.html',
  styleUrls: ['./lucky-draw-countdown.component.scss'],
})
export class LuckyDrawCountdownComponent extends SharedComponent implements OnInit {
  @Input('event') event: JJEvent;
  timer: CountdownTimer;

  constructor() {
    super();
    this.timer = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  ngOnInit() {
    let endDate = new Date(this.event.endAt);
    let interval: number = 1000;
    let timer = setInterval(() => {
      let { time, days, hours, minutes, seconds } = this.getDateDiff(endDate);
      if (time > 0) {
        this.timer = {
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        };
      } else {
        clearInterval(timer);
      }
    }, interval);
  }
}

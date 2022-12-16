import { Component, Input, OnInit } from '@angular/core';
import { CountdownTimer, SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';

@Component({
  selector: 'lucky-draw-countdown',
  templateUrl: './lucky-draw-countdown.component.html',
  styleUrls: ['./lucky-draw-countdown.component.scss'],
})
export class LuckyDrawCountdownComponent extends SharedComponent implements OnInit {
  @Input() event: JJEvent;
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
    const endDate = new Date(this.event.endAt);
    const interval = 1000;
    const timer = setInterval(() => {
      const { time, days, hours, minutes, seconds } = this.getDateDiff(endDate);
      if (time > 0) {
        this.timer = {
          days,
          hours,
          minutes,
          seconds,
        };
      } else {
        clearInterval(timer);
      }
    }, interval);
  }
}

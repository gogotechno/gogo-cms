import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CountdownTimer, SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent extends SharedComponent implements OnInit {
  @Input('timer') timer: CountdownTimer;
  @Input('endDate') endDate: Date;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['endDate'] && !this.timer) {
      this.startTimer();
    }
  }

  ngOnInit() {
    if (!this.timer) {
      this.timer = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }

  startTimer() {
    let endDate = new Date(this.endDate);
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

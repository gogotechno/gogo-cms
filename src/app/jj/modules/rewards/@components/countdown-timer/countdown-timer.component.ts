import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CountdownTimer, SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent extends SharedComponent implements OnInit {
  @Input() timer: CountdownTimer;
  @Input() endDate: Date;

  @Input() unitFormat: 'full' | 'short' = 'short';
  @Input() separator = ':';

  @Input() columns: string[] = ['days', 'hours', 'minutes', 'seconds'];

  unit: UnitFormat;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.endDate && !this.timer) {
      this.startTimer();
    }
  }

  ngOnInit() {
    this.timer = this.getTimer();
    this.unit = this.getUnitFormat();
  }

  getTimer(): CountdownTimer {
    if (this.timer) {
      return this.timer;
    }
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  getUnitFormat(): UnitFormat {
    switch (this.unitFormat) {
      case 'full':
        return {
          days: '_DAYS',
          hours: '_HOURS',
          minutes: '_MINUTES',
          seconds: '_SECONDS',
        };
      default:
        return {
          days: '_DAYS_SHORT',
          hours: '_HOURS_SHORT',
          minutes: '_MINUTES_SHORT',
          seconds: '_SECONDS_SHORT',
        };
    }
  }

  startTimer() {
    const endDate = new Date(this.endDate);
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

interface UnitFormat {
  days: '_DAYS' | '_DAYS_SHORT';
  hours: '_HOURS' | '_HOURS_SHORT';
  minutes: '_MINUTES' | '_MINUTES_SHORT';
  seconds: '_SECONDS' | '_SECONDS_SHORT';
}

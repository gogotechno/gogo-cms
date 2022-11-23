import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/jj/services/core.service';
import { CountdownTimer, SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'app-event-card-summary',
  templateUrl: './event-card-summary.component.html',
  styleUrls: ['./event-card-summary.component.scss'],
})
export class EventCardSummaryComponent extends SharedComponent implements OnInit {
  countdownTimer: CountdownTimer;

  constructor(private core: CoreService) { 
       super();
    this.countdownTimer = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }; }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    let endDate = new Date('2023-11-11');
    let interval: number = 1000;
    let timer = setInterval(() => {
      let { time, days, hours, minutes, seconds } = this.getDateDiff(endDate);
      if (time > 0) {
        this.countdownTimer = {
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

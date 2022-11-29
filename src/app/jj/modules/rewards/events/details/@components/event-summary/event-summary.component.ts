import { Component, OnInit } from '@angular/core';
import { CountdownTimer, SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss'],
})
export class EventSummaryComponent extends SharedComponent implements OnInit {
  event: JJEvent;
  timer: CountdownTimer;

  constructor(private details: DetailsService) {
    super();
    this.timer = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  ngOnInit() {
    this.details.event.subscribe((event) => {
      this.event = event;
      console.log(this.event);
      if (this.event) {
        this.startTimer();
      }
    });
  }

  startTimer() {
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

import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { CoreService } from 'src/app/jj/services/core.service';
import { CountdownTimer, SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'app-lucky-draw-activity',
  templateUrl: './lucky-draw-activity.component.html',
  styleUrls: ['./lucky-draw-activity.component.scss'],
})
export class LuckyDrawActivityComponent extends SharedComponent implements OnInit {
  countdownTimer: CountdownTimer;

  Events: any[];
  EventGroup: any[][];

  constructor(private core: CoreService) {
    super();
    this.countdownTimer = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  async ngOnInit() {
    this.Events = await this.core.getOngoingEvents({
      itemsPerPage: 10,
      currentPage: 1,
    });

    console.log(this.Events);

    this.EventGroup = _.chunk(this.Events, 1);

    console.log(this.EventGroup);
  

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

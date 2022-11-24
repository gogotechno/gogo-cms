import { Component, Input, OnInit } from '@angular/core';
import { CountdownTimer } from 'src/app/jj/shared';

@Component({
  selector: 'countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit {
  @Input('timer') timer: CountdownTimer;

  constructor() {}

  ngOnInit() {}
}

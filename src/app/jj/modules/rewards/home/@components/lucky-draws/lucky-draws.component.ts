import { Component, Input, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'lucky-draws',
  templateUrl: './lucky-draws.component.html',
  styleUrls: ['./lucky-draws.component.scss'],
})
export class LuckyDrawsComponent extends SharedComponent implements OnInit {
  @Input() events: JJEvent[];

  constructor(private home: HomeService) {
    super();
  }

  ngOnInit() {
    this.home.ongoingEvents.subscribe((events) => (this.events = events));
  }
}

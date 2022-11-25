import { Component, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'app-lucky-draw-activity',
  templateUrl: './lucky-draw-activity.component.html',
  styleUrls: ['./lucky-draw-activity.component.scss'],
})
export class LuckyDrawActivityComponent extends SharedComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}

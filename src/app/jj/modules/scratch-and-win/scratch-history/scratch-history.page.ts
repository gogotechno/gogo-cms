import { Component, OnInit } from '@angular/core';
import { JJScratchHistory } from 'src/app/jj/typings';

@Component({
  selector: 'app-scratch-history',
  templateUrl: './scratch-history.page.html',
  styleUrls: ['./scratch-history.page.scss'],
})
export class ScratchHistoryPage implements OnInit {
  history: JJScratchHistory[] = [
    {
      customer_id: 1,
      prize_id: 1,
      scratchedAt: new Date(),
      prize: {
        name: 'Prize 1',
        description: 'Prize 1 Desc',
        thumbnailImage: '',
        worth: 100,
        scratch_and_win_event_id: 1,
      },
    },
  ];

  constructor() {}

  ngOnInit() {}
}

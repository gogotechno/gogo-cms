import { Component, OnInit } from '@angular/core';
import { EventStatus, JJScratchAndWinEvent, JJScratchHistory, JJTicketDistribution } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-scratch-history',
  templateUrl: './scratch-history.page.html',
  styleUrls: ['./scratch-history.page.scss'],
})
export class ScratchHistoryPage implements OnInit {

  event: JJScratchAndWinEvent = {
    name: 'Scratch and Win',
    highlight: '',
    description: '',
    tnc: '',
    status: EventStatus.ACTIVE,
    startAt: undefined,
    endAt: undefined,
    logo: 'https://cdn.shopify.com/app-store/listing_images/c6f8970d63d49bc8a5992dec76e3145e/banner/COG-5aX0lu8CEAE=.jpg',
    coverImage: '',
    backgroundImage: '',
    scratchBackgroundImage: '',
    scratchPlaceholderImage: '',
    distance: '',
  };

  histories: JJScratchHistory[] = [
    {
      customer_id: 1,
      prize_id: 1,
      scratchedAt: new Date(),
      prize: {
        name: 'Prize 1',
        description: 'Prize 1 Desc',
        thumbnailImage: 'https://image.winudf.com/v2/image1/c2NyYXRjaC53aW4uc2NyYXRjaC5jYXJkMV9zY3JlZW5fMF8xNTU5MTE1NjY4XzA1Mg/screen-0.jpg?fakeurl=1&type=.jpg',
        worth: 100,
        scratch_and_win_event_id: 1,
      },
    },
    {
      customer_id: 2,
      prize_id: 2,
      scratchedAt: new Date(),
      prize: {
        name: 'Prize 2',
        description: 'Prize 2 Desc',
        thumbnailImage: 'https://image.winudf.com/v2/image1/c2NyYXRjaC53aW4uc2NyYXRjaC5jYXJkMV9zY3JlZW5fMF8xNTU5MTE1NjY4XzA1Mg/screen-0.jpg?fakeurl=1&type=.jpg',
        worth: 100,
        scratch_and_win_event_id: 2,
      },
    },
    {
      customer_id: 3,
      prize_id: 3,
      scratchedAt: new Date(),
      prize: {
        name: 'Prize 3',
        description: 'Prize 3 Desc',
        thumbnailImage: 'https://image.winudf.com/v2/image1/c2NyYXRjaC53aW4uc2NyYXRjaC5jYXJkMV9zY3JlZW5fMF8xNTU5MTE1NjY4XzA1Mg/screen-0.jpg?fakeurl=1&type=.jpg',
        worth: 100,
        scratch_and_win_event_id: 3,
      },
    },
    {
      customer_id: 4,
      prize_id: 4,
      scratchedAt: new Date("2022/11/29 16:45"),
      prize: {
        name: 'Prize 4',
        description: 'Prize 4 Desc',
        thumbnailImage: 'https://image.winudf.com/v2/image1/c2NyYXRjaC53aW4uc2NyYXRjaC5jYXJkMV9zY3JlZW5fMF8xNTU5MTE1NjY4XzA1Mg/screen-0.jpg?fakeurl=1&type=.jpg',
        worth: 100,
        scratch_and_win_event_id: 4,
      },
    },
    {
      customer_id: 5,
      prize_id: 5,
      scratchedAt: new Date("2022/11/28"),
      prize: {
        name: 'Prize 5',
        description: 'Prize 5 Desc',
        thumbnailImage: 'https://image.winudf.com/v2/image1/c2NyYXRjaC53aW4uc2NyYXRjaC5jYXJkMV9zY3JlZW5fMF8xNTU5MTE1NjY4XzA1Mg/screen-0.jpg?fakeurl=1&type=.jpg',
        worth: 100,
        scratch_and_win_event_id: 5,
      },
    },
  ];

  constructor() { }

  ngOnInit() { }

  showRecordDate(index: number) {
    if (index == 0) {
      return true;
    }
    let previous = this.histories[index - 1];
    let current = this.histories[index];
    let previousDate = new Date(previous.scratchedAt).toDateString();
    let currentDate = new Date(current.scratchedAt).toDateString();
    return previousDate != currentDate;
  }
}

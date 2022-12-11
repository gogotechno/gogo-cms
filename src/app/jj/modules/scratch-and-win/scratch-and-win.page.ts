import { Component, OnInit } from '@angular/core';
import { EventStatus, JJScratchAndWinEvent } from '../../typings';

@Component({
  selector: 'app-scratch-and-win',
  templateUrl: './scratch-and-win.page.html',
  styleUrls: ['./scratch-and-win.page.scss'],
})
export class ScratchAndWinPage implements OnInit {
  
  event: JJScratchAndWinEvent = {
    name: '',
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

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/jj/services';
import { JJSlideshow, JJSlideshowItem } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {
  slideshow: JJSlideshow;
  slideshowItems: JJSlideshowItem[];

  slideOpts = {
    spaceBetween: 8,
  };

  constructor(private common: CommonService, private home: HomeService) {}

  ngOnInit() {
    this.home.slideshow.subscribe((slideshow) => {
      this.slideshow = slideshow;
      if (this.slideshow) {
        this.slideshowItems = this.slideshow.items;
      }
    });
  }

  async onItemClick(item: JJSlideshowItem) {
    await this.common.navigateCustomUrl(item.url);
  }
}

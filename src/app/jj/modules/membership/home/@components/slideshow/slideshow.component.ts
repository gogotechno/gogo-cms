import { Component, OnInit } from '@angular/core';
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

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.home.slideshow.subscribe((slideshow) => {
      this.slideshow = slideshow;
      if (this.slideshow) {
        this.slideshowItems = this.slideshow.items;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/cms.service';
import { CmsSlideshow } from 'src/app/cms.type';

@Component({
  selector: 'cms-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {

  slideshow: CmsSlideshow;

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.slideshow = await this.cms.getSlideshow('home-slideshow');
    console.log(this.slideshow)
  }

}

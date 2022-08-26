import { Component, Input, OnInit } from '@angular/core';
import { CmsSlideshow } from 'src/app/cms.type';

@Component({
  selector: 'cms-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit {

  @Input() options: any;
  @Input() slideshow: CmsSlideshow;

  pager: boolean;

  constructor() { }

  ngOnInit() {
    this.pager = this.options && this.options.pager;
  }

}

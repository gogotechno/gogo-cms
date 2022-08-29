import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productCategories } from './mock-up-data';

@Component({
  selector: 'app-teckguan',
  templateUrl: './teckguan.page.html',
  styleUrls: ['./teckguan.scss', './teckguan.page.scss'],
})
export class TeckguanPage implements OnInit {

  currentUrl: string = '/teckguan/fleet';
  categories;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.url.subscribe(segments => {
    //   this.currentUrl = segments.join('/');
    //   console.log(this.currentUrl);
    // });
    this.loadData();
  }

  async loadData() {
    this.categories = productCategories;
  }

}

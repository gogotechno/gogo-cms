import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jj-news-ticker',
  templateUrl: './jj-news-ticker.component.html',
  styleUrls: ['./jj-news-ticker.component.scss'],
})
export class JjNewsTickerComponent implements OnInit {
  @Input('messages') messages: string[];

  constructor() {}

  ngOnInit() {}
}

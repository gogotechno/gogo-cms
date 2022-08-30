import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss'],
})
export class HtmlViewerComponent implements OnInit {

  @Input("html") htmlStr: string;

  constructor() { }

  ngOnInit() { }

}

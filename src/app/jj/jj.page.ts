import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-jj',
  templateUrl: './jj.page.html',
  styleUrls: ['./jj.page.scss'],
})
export class JJPage implements OnInit {
  constructor(@Inject(DOCUMENT) private doc: Document) {
    const links = this.doc.head.getElementsByTagName('link');
    let link: HTMLLinkElement = this.doc.createElement('link');
    for (let index = 0; index < links.length; index++) {
      const link = links.item(index);
      if (link.rel === 'icon') {
        link.setAttribute('href', '/assets/jj/favicon.ico');
        // this.doc.head.replaceChild(this.doc.head, link);
      }
    }

    link = this.doc.createElement('link');
    link.setAttribute('rel', 'apple-touch-icon');
    link.setAttribute('sizes', '180x180');
    link.setAttribute('href', '/assets/jj/apple-touch-icon.png');
    this.doc.head.appendChild(link);

    link = this.doc.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/png');
    link.setAttribute('sizes', '32x32');
    link.setAttribute('href', '/assets/jj/favicon-32x32.png');
    this.doc.head.appendChild(link);

    link = this.doc.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('type', 'image/png');
    link.setAttribute('sizes', '16x16');
    link.setAttribute('href', '/assets/jj/favicon-16x16.png');
    this.doc.head.appendChild(link);

    link = this.doc.createElement('link');
    link.setAttribute('rel', 'manifest');
    link.setAttribute('href', '/assets/jj/site.webmanifest');
    this.doc.head.appendChild(link);
  }

  ngOnInit() {}
}

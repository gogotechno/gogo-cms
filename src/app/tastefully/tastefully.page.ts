import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tastefully',
  templateUrl: './tastefully.page.html',
  styleUrls: ['./tastefully.scss', './tastefully.page.scss'],
})
export class TastefullyPage implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Tastefully');
  }

}

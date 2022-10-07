import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-jj-luckydraw',
  templateUrl: './jj-luckydraw.page.html',
  styleUrls: ['./jj-luckydraw.page.scss'],
})
export class JjLuckydrawPage implements OnInit {

  constructor(private title: Title, private auth: AuthService) { }

  ngOnInit() {
    console.log('Hello JJ')
    this.title.setTitle('JJ Lucky');
    this.auth.init();
  }

}

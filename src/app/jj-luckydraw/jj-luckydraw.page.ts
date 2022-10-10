import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { JJLuckydrawService } from './jj-luckydraw.service';

@Component({
  selector: 'app-jj-luckydraw',
  templateUrl: './jj-luckydraw.page.html',
  styleUrls: ['./jj-luckydraw.page.scss'],
})
export class JJLuckydrawPage implements OnInit {

  constructor(private lucky: JJLuckydrawService, private auth: AuthService) { }

  async ngOnInit() {
    await this.lucky.init();
    await this.auth.init()
  }

}

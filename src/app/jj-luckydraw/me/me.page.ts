import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  me;

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    // this.me = await this.auth.getMe();
  }

  async onSignOut(event?) {
    // await this.auth.signOut();
  }

}

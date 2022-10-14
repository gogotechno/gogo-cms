import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { JJUser } from '../jj-luckydraw.type';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  loaded: boolean;
  me: JJUser;

  constructor(private auth: AuthService) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.me = await this.auth.findMe();
    this.loaded = true;
  }

  async doRefresh(event: Event) {
    let refresherEl = <HTMLIonRefresherElement>event.target;
    await this.loadData();
    refresherEl.complete();
  }

  async onSignOut(event?: Event) {
    await this.auth.signOut();
  }

}

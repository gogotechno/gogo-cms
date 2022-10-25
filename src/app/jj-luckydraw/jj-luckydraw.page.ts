import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { JJLuckydrawService } from './jj-luckydraw.service';
import { SystemUserRole } from './jj-luckydraw.type';

@Component({
  selector: 'app-jj-luckydraw',
  templateUrl: './jj-luckydraw.page.html',
  styleUrls: ['./jj-luckydraw.page.scss'],
})
export class JJLuckydrawPage implements OnInit {

  public role: SystemUserRole;

  constructor(private lucky: JJLuckydrawService, private auth: AuthService) { }

  async ngOnInit() {
    await this.lucky.init();
    await this.auth.init();
    this.role = this.auth.userRole;
  }

}

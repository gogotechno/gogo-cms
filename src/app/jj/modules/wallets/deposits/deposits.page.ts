import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
})
export class DepositsPage implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {

  }

  async OpenDetails() {
    this.router.navigate(["/jj/wallets/deposit"]);
  }

}

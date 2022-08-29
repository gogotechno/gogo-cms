import { Component, OnInit } from '@angular/core';
import { TastefullyService } from '../tastefully.service';
import { TastefullyCustomer } from '../tastefully.type';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  readonly CURRENT_CUSTOMER: TastefullyCustomer;

  constructor(private tastefully: TastefullyService) {
    this.CURRENT_CUSTOMER = this.tastefully.CURRENT_CUSTOMER;
  }

  ngOnInit() {
  }

}

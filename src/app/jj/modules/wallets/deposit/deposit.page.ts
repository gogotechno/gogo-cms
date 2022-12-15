import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJDepositRequest } from 'src/app/jj/typings';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  depositId: number;
  deposit: JJDepositRequest;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.depositId = params[':id'];
  }
}

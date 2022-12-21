import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { JJWithdrawRequest } from 'src/app/jj/typings';


@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  withdrawId: number;
  withdraw: JJWithdrawRequest;

  constructor(private route: ActivatedRoute, private core: CoreService) {}

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.withdrawId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.withdraw = await this.core.getWithdrawRequestById(this.withdrawId);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }

}

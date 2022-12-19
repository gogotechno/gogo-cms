import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { JJWalletTransaction } from 'src/app/jj/typings';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  transactionId: number;
  transaction: JJWalletTransaction;

  constructor(private route: ActivatedRoute, private core: CoreService) {}

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.transactionId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.transaction = await this.core.getWalletTransactionById(this.transactionId);
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

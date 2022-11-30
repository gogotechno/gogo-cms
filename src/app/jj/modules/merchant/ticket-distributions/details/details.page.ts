import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJTicket, JJTicketDistribution } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';
import { DetailsService } from './@services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage extends SharedComponent implements OnInit {
  segment: 'details' | 'tickets';

  constructor(private route: ActivatedRoute, private details: DetailsService) {
    super();
  }

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.details.distributionId = params['id'];
    this.segment = 'details';
    await this.details.init();
  }

  ngOnDestroy() {
    this.details.destroy();
  }

  async doRefresh(event: Event) {
    await this.details.init();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

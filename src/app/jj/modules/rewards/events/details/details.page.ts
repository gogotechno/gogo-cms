import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/jj/services';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from './@services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  backButtonText: string;
  segment: 'draw' | 'points' | 'snw' = 'draw';
  event: JJEvent;

  constructor(private route: ActivatedRoute, private common: CommonService, private details: DetailsService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.details.eventId = params.id;
    await this.loadData();
    this.details.event.subscribe((event) => (this.event = event));
  }

  ngOnDestroy() {
    this.details.destroy();
  }

  async loadData() {
    await this.details.init();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

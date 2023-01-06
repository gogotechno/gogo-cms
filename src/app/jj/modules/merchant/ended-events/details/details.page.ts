import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, CoreService } from 'src/app/jj/services';
import { JJEvent } from 'src/app/jj/typings';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  backButtonText: string;
  eventId: number;
  event: JJEvent;

  constructor(private route: ActivatedRoute, private core: CoreService, private common: CommonService) {}

  async ngOnInit() {
    this.backButtonText = await this.common.getBackButtonText();
    const params = this.route.snapshot.params;
    this.eventId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.event = await this.core.getEventById(this.eventId, {
      withSummary: true,
    });
  }

  async doRefresh(event: Event) {
    await this.loadData();
    const refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

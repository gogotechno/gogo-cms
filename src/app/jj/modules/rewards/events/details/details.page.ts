import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './@services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  segment: 'draw' | 'points' | 'snw' = 'draw';

  constructor(private route: ActivatedRoute, private details: DetailsService) {}

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.details.eventId = params['id'];
    await this.loadData();
  }

  ngOnDestroy() {
    this.details.destroy();
  }

  async loadData() {
    await this.details.init();
  }

  async doRefresh(event: Event) {
    await this.loadData();
    let refresher = <HTMLIonRefresherElement>event.target;
    refresher.complete();
  }
}

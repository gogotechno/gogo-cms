import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJEvent } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  loaded: boolean;
  eventId: number;
  event: JJEvent;

  constructor(private route: ActivatedRoute, private lucky: JJLuckydrawService) { }

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.eventId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.event = await this.lucky.getEventById(this.eventId);
    this.loaded = true;
  }

}

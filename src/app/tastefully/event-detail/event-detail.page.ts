import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { CmsService } from 'src/app/cms.service';
import { getTime } from 'src/app/cms.util';
import { TastefullyEvent } from '../tastefully.type';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  eventSlug: string;
  event: TastefullyEvent;

  constructor(private cms: CmsService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    let params = this.activatedRoute.snapshot.params;
    this.eventSlug = params.slug;

    let table = await this.cms.getTable("events");
    this.event = await this.cms.getDocument(table, this.eventSlug);

    this.mapEvent();
  }

  mapEvent() {
    let startTime = getTime(this.event.startAt);
    this.event.startAt = dayjs().set("hour", startTime.hour).set("minute", startTime.minute).format("hh:mm a");

    let endTime = getTime(this.event.endAt);
    this.event.endAt = dayjs().set("hour", endTime.hour).set("minute", endTime.minute).format("hh:mm a");
  }

}

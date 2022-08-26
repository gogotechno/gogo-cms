import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { CmsService } from 'src/app/cms.service';
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
    let sArr = this.event.startAt.split(":");
    let sHour = Number(sArr[0]);
    let sMinute = Number(sArr[1]);
    this.event.startAt = dayjs().set("hour", sHour).set("minute", sMinute).format("hh:mm a");

    let eArr = this.event.endAt.split(":");
    let eHour = Number(eArr[0]);
    let eMinute = Number(eArr[1]);
    this.event.endAt = dayjs().set("hour", eHour).set("minute", eMinute).format("hh:mm a");
  }

}

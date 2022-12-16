import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from 'src/app/cms.service';
import { timestr_to_date } from 'src/app/cms.util';
import { TastefullyEvent } from '../tastefully.type';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  eventSlug: string;
  event: TastefullyEvent;

  constructor(private cms: CmsService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  async ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.eventSlug = params.slug;

    const table = await this.cms.getTable('events');
    this.event = await this.cms.getDocument(table, this.eventSlug);

    this.event.startAt = this.datePipe.transform(timestr_to_date(this.event.startAt), 'hh:mm a');
    this.event.endAt = this.datePipe.transform(timestr_to_date(this.event.endAt), 'hh:mm a');
  }

}

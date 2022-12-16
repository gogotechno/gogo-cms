import { Component, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent extends SharedComponent implements OnInit {
  event: JJEvent;
  canExpand: boolean;
  expanded: boolean;

  constructor(private details: DetailsService) {
    super();
  }

  async ngOnInit() {
    this.details.event.subscribe(async (event) => {
      this.event = event;
      if (this.event) {
        const descriptionEl = await this.assertElement('description');
        this.canExpand = descriptionEl.scrollHeight > descriptionEl.clientHeight;
      }
    });
  }

  async toggleMore() {
    this.expanded = !this.expanded;
    const descriptionEl = await this.assertElement('description');
    if (!this.expanded) {
      descriptionEl.classList.add('ion-text-ellipsis');
    } else {
      descriptionEl.classList.remove('ion-text-ellipsis');
    }
  }
}

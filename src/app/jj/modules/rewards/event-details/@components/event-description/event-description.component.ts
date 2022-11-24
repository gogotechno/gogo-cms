import { Component, OnInit } from '@angular/core';
import { SharedComponent } from 'src/app/jj/shared';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent extends SharedComponent implements OnInit {
  canExpand: boolean;
  expanded: boolean;

  constructor() {
    super();
  }

  async ngOnInit() {
    let descriptionEl = await this.assertElement('description');
    this.canExpand = descriptionEl.scrollHeight > descriptionEl.clientHeight;
  }

  async toggleMore() {
    let descriptionEl = await this.assertElement('description');
    if (this.expanded) {
      descriptionEl.classList.add('ion-text-ellipsis');
    } else {
      descriptionEl.classList.remove('ion-text-ellipsis');
    }

    this.expanded = !this.expanded;
  }
}

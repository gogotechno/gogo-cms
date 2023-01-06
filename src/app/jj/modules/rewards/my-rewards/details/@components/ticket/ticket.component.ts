import { Component, Input, OnInit } from '@angular/core';
import { JJTicket } from 'src/app/jj/typings';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Input() ticket: JJTicket;

  get statusColor() {
    switch (this.ticket.status) {
      case 'INVALID':
        return 'danger';
      default:
        return 'success';
    }
  }

  constructor() {}

  ngOnInit() {}
}

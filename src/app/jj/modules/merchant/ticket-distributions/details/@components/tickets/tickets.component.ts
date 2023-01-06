import { Component, OnInit } from '@angular/core';
import { JJTicket } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  tickets: JJTicket[];

  get ticketsEnded() {
    return this.details.ticketsEnded;
  }

  constructor(private details: DetailsService) {}

  ngOnInit() {
    this.details.tickets.subscribe((tickets) => (this.tickets = tickets));
  }

  loadMoreTickets(event: Event) {
    this.details.loadMoreTickets(event);
  }

  getTicketStatusColor(ticket: JJTicket) {
    switch (ticket.status) {
      case 'INVALID':
        return 'danger';
      default:
        return 'success';
    }
  }
}

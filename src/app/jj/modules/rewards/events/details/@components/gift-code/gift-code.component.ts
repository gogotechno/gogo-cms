import { Component, OnInit } from '@angular/core';
import { JJEvent } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';

@Component({
  selector: 'gift-code',
  templateUrl: './gift-code.component.html',
  styleUrls: ['./gift-code.component.scss'],
})
export class GiftCodeComponent implements OnInit {
  event: JJEvent;

  constructor(private details: DetailsService) {}

  ngOnInit() {
    this.details.event.subscribe((event) => {
      this.event = event;
    });
  }
}

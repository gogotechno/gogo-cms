import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './@services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  // segment = 'luck-draw';

  constructor(private route: ActivatedRoute, private details: DetailsService) {}

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.details.eventId = params['id'];
    this.details.init();
  }
}

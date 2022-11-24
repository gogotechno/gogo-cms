import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJTicketDistribution } from 'src/app/jj-luckydraw/jj-luckydraw.type';
import { CoreService } from 'src/app/jj/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  distributionId: number;
  distribution: JJTicketDistribution;

  constructor(private route: ActivatedRoute, private core: CoreService) {}

  async ngOnInit() {
    let params = this.route.snapshot.params;
    this.distributionId = params['id'];
    // this.distribution = await this.core.getTicketDistributionById(this.distributionId);
  }
}

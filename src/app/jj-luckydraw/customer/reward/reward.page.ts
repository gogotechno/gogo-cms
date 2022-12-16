import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JJLuckydrawService } from '../../jj-luckydraw.service';
import { JJWinner } from '../../jj-luckydraw.type';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.page.html',
  styleUrls: ['./reward.page.scss'],
})
export class RewardPage implements OnInit {
  loaded: boolean;
  rewardId: number;
  reward: JJWinner;

  constructor(private route: ActivatedRoute, private lucky: JJLuckydrawService) {}

  async ngOnInit() {
    const params = this.route.snapshot.params;
    this.rewardId = params.id;
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    this.reward = await this.lucky.getRewardById(this.rewardId);
    this.loaded = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsFilter } from 'src/app/cms.type';
import { Conditions } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filter: CmsFilter;
  conditions: Conditions;
  needRefresh: boolean;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async onSubmit(conditions: Conditions) {
    this.conditions = conditions;
    this.needRefresh = true;
    await this.onDismiss();
  }

  async onReset(conditions: Conditions) {
    this.conditions = conditions;
    this.needRefresh = true;
    await this.onDismiss();
  }

  async onDismiss() {
    await this.modalCtrl.dismiss({
      conditions: this.conditions,
      needRefresh: this.needRefresh,
    });
  }
}

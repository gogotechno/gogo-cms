import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from 'src/app/cms-ui/filter/filter.component';
import { CmsFilter } from 'src/app/cms.type';
import { Conditions } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-reward-filter',
  templateUrl: './reward-filter.component.html',
  styleUrls: ['./reward-filter.component.scss'],
})
export class RewardFilterComponent implements OnInit {
  @ViewChild(FilterComponent) cmsFilter: FilterComponent;

  loaded: boolean;
  filter: CmsFilter;
  conditions: Conditions;
  needRefresh: boolean;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loaded = false;
    this.loaded = true;
  }

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
    let conditions = this.cmsFilter.removeEmptyKeys(this.conditions);
    await this.modalCtrl.dismiss({
      conditions: conditions,
      needRefresh: this.needRefresh
    });
  }

}

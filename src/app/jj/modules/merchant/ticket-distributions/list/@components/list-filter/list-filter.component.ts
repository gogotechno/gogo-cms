import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from 'src/app/cms-ui/filter/filter.component';
import { CmsFilter } from 'src/app/cms.type';
import { Conditions } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
})
export class ListFilterComponent implements OnInit {
  @ViewChild(FilterComponent) cmsFilter: FilterComponent;

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
    const conditions = this.cmsFilter.removeEmptyKeys(this.conditions);
    await this.modalCtrl.dismiss({
      conditions,
      needRefresh: this.needRefresh,
    });
  }
}

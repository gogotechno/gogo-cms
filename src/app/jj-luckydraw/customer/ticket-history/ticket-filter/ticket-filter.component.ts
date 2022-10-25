import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from 'src/app/cms-ui/filter/filter.component';
import { CmsFilter } from 'src/app/cms.type';
import { Conditions } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
})
export class TicketFilterComponent implements OnInit {

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

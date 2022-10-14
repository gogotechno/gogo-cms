import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OnSelectLoad, OnSelectScrollToEnd } from 'src/app/cms.type';
import { Pagination } from 'src/app/sws-erp.type';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss'],
})
export class SearchAreaComponent implements OnInit {

  loaded: boolean;

  title: string;

  labelFields: string[]
  labelSeparator: string;

  codeFields: string[];
  codeSeparator: string;

  noMoreText: string;
  emptyText: string;

  pagination: Pagination;

  items: any[];
  noMoreItems: boolean;

  onLoad: OnSelectLoad;
  onScrollToEnd: OnSelectScrollToEnd;

  selectedItems: any[];

  //no function yet
  multiple: boolean;

  constructor(private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.selectedItems = this.selectedItems || [];
    await this.loadData();
  }

  async loadData() {
    this.loaded = false;
    let [items, pagination] = await this.onLoad();
    this.pagination = pagination;
    this.items = this.populateItems(items);
    this.noMoreItems = this.items.length < this.pagination.itemsPerPage;
    this.loaded = true;
  }

  async loadMoreItems(event: Event) {
    let infiniteScrollEl = <HTMLIonInfiniteScrollElement>event.target;
    this.pagination.currentPage += 1;
    let [items, pagination] = await this.onScrollToEnd(this.pagination);
    this.pagination = pagination;
    this.items = [...this.items, ...this.populateItems(items)];
    this.noMoreItems = items.length <= 0;
    infiniteScrollEl.complete();
  }

  populateItems(items: any[]) {
    return items.map((item) => {
      item.selectLabel = this.concatLabel(item);
      item.selected = this.selectedItems.findIndex((i) => this.concatCode(i) == this.concatCode(item)) > -1;
      return item;
    })
  }

  private concatLabel(item: any) {
    return this.labelFields.map((f) => item[f]).join(this.labelSeparator);
  }

  private concatCode(item: any) {
    return this.codeFields.map((f) => item[f]).join(this.codeSeparator);
  }

  async onDismiss() {
    await this.modalCtrl.dismiss({
      items: this.selectedItems
    });
  }

  async onItemClicked(item: any) {
    item.selected = true;
    if (this.multiple) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = [item];
    }
    await this.onDismiss();
  }

}

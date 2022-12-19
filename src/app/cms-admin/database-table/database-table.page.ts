import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsTranslatePipe, FirestoreDatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsService } from 'src/app/cms.service';
import { CmsAdminChildPage, CmsForm, CmsTable } from 'src/app/cms.type';
import {saveAs} from 'file-saver';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-database-table',
  templateUrl: './database-table.page.html',
  styleUrls: ['./database-table.page.scss'],
  providers: [CmsTranslatePipe, TranslatePipe, FirestoreDatePipe, DatePipe]
})
export class DatabaseTablePage extends CmsAdminChildPage implements OnInit {

  tableId: string;
  table: CmsTable;
  form: CmsForm;
  list = [];
  selectMode = false;
  selectedItems = [];

  constructor(private cms: CmsService, private route: ActivatedRoute, private cmsTranslate: CmsTranslatePipe, private translate: TranslatePipe, private firestoreDate: FirestoreDatePipe, private date: DatePipe) {
    super();
  }

  ngOnInit() {
    this.tableId = this.route.snapshot.params.table;
    this.loadData();
  }

  async loadData() {
    this.table = await this.cms.getTable(this.tableId);
    this.list = await this.cms.getTableData(this.table);
    this.title = this.cmsTranslate.transform(this.table.name);
    this.form = await this.cms.getForm(this.tableId);
    console.log('List: ', this.list);
  }

  getTableDataName(tableData: any) {
    const nameField = this.table.nameField;
    let name = tableData.name || tableData[nameField];
    if (this.cms.isTranslationObject(name)) {
      name = this.cmsTranslate.transform(name);
    }
    return name;
  }

  getTableDataId(tableData: any) {
    const idField = this.table.codeField;
    const id = tableData.code || tableData[idField] as string;
    return id;
  }

  onSelectModeClick(event?: Event) {
    this.selectMode = true;
  }

  onCancelSelectModeClick(event?: Event) {
    this.selectMode = false;
    this.selectedItems = [];
  }

  toggleItem(item, event: Event) {
    const checked = (<CustomEvent>event).detail.checked;
    if (checked) {
      this.selectedItems.push(item);
    } else {
      const i = this.selectedItems.findIndex((v) => this.getTableDataId(v) === this.getTableDataId(item));
      this.selectedItems.splice(i, 1);
    }
    console.log(this.selectedItems);
  }

  export(list: any[]) {
    let csv = '';
    const headers = this.form.items.map(item => `"${this.cmsTranslate.transform(item.label)}"`);
    headers.push(this.translate.transform('_UPDATED_AT'));
    csv += headers.join(',') + '\n';
    list.forEach(v => {
      const values = [];
      this.form.items.forEach(item => {
        values.push(`"${v[item.code]}"`);
      });
      values.push(`"${this.firestoreDate.transform(v.updatedAt, 'yyyy-MM-dd HH:mm:ss')}"`);
      csv += values.join(',') + '\n';
    });
    const data: Blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8'
    });
    saveAs(data, `${this.date.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')}-${this.cmsTranslate.transform(this.table.name)}.csv`);
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsService } from 'src/app/cms.service';
import { CmsAdminChildPage, CmsTable } from 'src/app/cms.type';

@Component({
  selector: 'app-database-table',
  templateUrl: './database-table.page.html',
  styleUrls: ['./database-table.page.scss'],
  providers: [CmsTranslatePipe]
})
export class DatabaseTablePage extends CmsAdminChildPage implements OnInit {

  tableId: string;
  table: CmsTable;
  list = [];
  selectMode = false;
  selectedItems = [];

  constructor(private cms: CmsService, private route: ActivatedRoute, private cmsTranslate: CmsTranslatePipe) {
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
  }

  getTableDataName(tableData: any) {
    let nameField = this.table.nameField;
    let name = tableData.name || tableData[nameField];
    if (this.cms.isTranslationObject(name)) {
      name = this.cmsTranslate.transform(name);
    }
    return name;
  }

  getTableDataId(tableData: any) {
    let idField = this.table.codeField;
    let id = tableData.code || tableData[idField] as string;
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
    let checked = (<CustomEvent>event).detail.checked;
    if (checked) {
      this.selectedItems.push(item);
    } else {
      let i = this.selectedItems.findIndex((v) => this.getTableDataId(v) === this.getTableDataId(item));
      this.selectedItems.splice(i, 1);
    }
    console.log(this.selectedItems);
  }

}

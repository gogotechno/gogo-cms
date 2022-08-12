import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsTable } from 'src/app/cms.type';

@Component({
  selector: 'app-database-form',
  templateUrl: './database-form.page.html',
  styleUrls: ['./database-form.page.scss'],
})
export class DatabaseFormPage implements OnInit {

  tableId: string;
  formId: string;
  documentId: string;
  table: CmsTable;
  form: CmsForm;
  document: any;

  constructor(private route: ActivatedRoute, private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.tableId = this.route.snapshot.params.table;
    this.table = await this.cms.getTable(this.tableId);
    this.formId = this.table.code;
    this.form = await this.cms.getForm(this.formId);
    this.documentId = this.route.snapshot.params.document;
    this.document = await this.cms.getDocument(this.table, this.documentId);

    console.log(this.document)
  }

  async saveDocument(document) {
    this.document = document;
    // await this.cms.saveDocument(this.table, document, this.documentId);
    alert("Document Saved!");
  }

}

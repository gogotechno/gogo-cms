import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsTable } from 'src/app/cms.type';

@Component({
  selector: 'app-database-form',
  templateUrl: './database-form.page.html',
  styleUrls: ['./database-form.page.scss'],
  providers: [TranslatePipe]
})
export class DatabaseFormPage implements OnInit {

  tableId: string;
  formId: string;
  documentId: string;
  table: CmsTable;
  form: CmsForm;
  document: any;
  isLoaded = false;

  constructor(private route: ActivatedRoute, private cms: CmsService, private translate: TranslatePipe) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoaded = false;
    this.tableId = this.route.snapshot.params.table;
    this.table = await this.cms.getTable(this.tableId);
    this.formId = this.table.code;
    this.form = await this.cms.getForm(this.formId);
    this.documentId = this.route.snapshot.params.document;
    this.document = await this.cms.getDocument(this.table, this.documentId);
    if (!this.document) {
      this.documentId = null;
    }
    this.isLoaded = true;
    console.log(this.document)
  }

  async saveDocument(document: any) {
    this.document = document;
    if (confirm(this.translate.transform('_DOCUMENT_SAVE_CONFIRMATION_MESSAGE'))) {
      await this.cms.saveDocument(this.table, document, this.documentId);
      alert(this.translate.transform('_DOCUMENT_SAVED_MESSAGE'));
    }
  }

}

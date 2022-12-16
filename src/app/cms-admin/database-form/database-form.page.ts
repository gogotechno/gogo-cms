import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsTable } from 'src/app/cms.type';
import { AppUtils } from 'src/app/cms.util';

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
  collectionPath: string;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private app: AppUtils,
    private cms: CmsService
  ) { }

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
    if (this.document) {
      this.collectionPath = `${this.tableId}/${this.documentId}`;
    } else {
      this.documentId = null;
      this.collectionPath = this.tableId;
    }
    this.isLoaded = true;
  }

  async saveDocument(document: any) {
    this.document = document;
    const confirm = await this.app.presentConfirm('_DOCUMENT_SAVE_CONFIRMATION_MESSAGE');
    if (confirm) {
      const { id } = await this.cms.saveDocument(this.table, document, this.documentId);
      if (!this.documentId) {
        this.documentId = id;
        this.collectionPath += `/${this.documentId}`;
      }
      await this.app.presentAlert('_DOCUMENT_SAVED_MESSAGE');
    }
  }

}

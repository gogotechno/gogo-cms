import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaskApplierService } from 'ngx-mask';
import { CmsService } from '../cms.service';
import { CmsForm, CmsTable } from '../cms.type';
import { GiverService } from '../giver.service';

@Component({
  selector: 'app-giver-form',
  templateUrl: './giver-form.page.html',
  styleUrls: ['./giver-form.page.scss'],
})
export class GiverFormPage implements OnInit {

  qrUrl: string;
  formCode: string;
  cmsForm: CmsForm;
  value: any;

  constructor(private _route: ActivatedRoute, private cms: CmsService, private _giver: GiverService, private mask: MaskApplierService) { }

  async ngOnInit() {
    this.formCode = this._route.snapshot.params.formCode;
    this.qrUrl = this._route.snapshot.queryParams.url;
    this.cmsForm = await this.cms.getForm(this.formCode);
    this.value = {machineLink: this.qrUrl};

  }

  async onSubmit(event) {
    console.log(event);
    let formData = event;
    let table = await this.cms.getTable(this.formCode);
    let doc = await this.cms.getDocument(table, formData.mykad);

    if (doc) {
      alert('Already register!');
      return;
    }

    let result = await this.cms.saveDocument(table, event);
    await this._giver.scan(event);


    console.log(result);
  }

}

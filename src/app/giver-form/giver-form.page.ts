import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CmsTranslatePipe } from '../cms-ui/cms.pipe';
import { FormComponent } from '../cms-ui/form/form.component';
import { CmsService } from '../cms.service';
import { CmsForm, CmsTable } from '../cms.type';
import { GiverService } from '../giver.service';

@Component({
  selector: 'app-giver-form',
  templateUrl: './giver-form.page.html',
  styleUrls: ['./giver-form.page.scss'],
  providers: [ CmsTranslatePipe ]
})
export class GiverFormPage implements OnInit {

  @ViewChild('cmsFormComponent') cmsFormComponent: FormComponent;
  @ViewChild('inquiryFormComponent') inquiryFormComponent: FormComponent;

  qrUrl: string;
  formCode: string;
  cmsTable: CmsTable;
  cmsForm: CmsForm;
  inquiryForm: CmsForm;
  inquiryResult: any;
  value: any;
  state: "welcome" | "register" | "inquiry" | "success" = "welcome";

  constructor(private _route: ActivatedRoute,
    private cms: CmsService,
    private _giver: GiverService,
    private alertController: AlertController,
    private translate: TranslateService,
    private title: Title,
    private cmsTranslate: CmsTranslatePipe) { }

  async ngOnInit() {
    this.formCode = this._route.snapshot.params.formCode;
    this.qrUrl = this._route.snapshot.queryParams.url;
    this.cmsForm = await this.cms.getForm(this.formCode);
    this.value = { machineLink: this.qrUrl };
    this.cmsTable = await this.cms.getTable(this.formCode);
  
    this.title.setTitle(this.cmsTranslate.transform(this.cmsForm.name));

    if (this.cmsForm.cover) {
      this.state = 'welcome';
    }

    let idItem = this.cmsForm.items.find(item => item.code === this.cmsTable.codeField);

    this.inquiryForm = {
      code: '',
      items: [idItem],
      lines: 'none',
      labelPosition: 'stacked'
    }
  }

  async onSubmit(event) {

    console.log('Submit')

    let validate = await this.cmsFormComponent.validateFormAndShowErrorMessages();
    if (!validate.valid) {
      return;
    }

    console.log('Submit')
    let formData = event;
    let doc = await this.cms.getDocument(this.cmsTable, formData[this.cmsTable.codeField]);

    if (doc) {
      let alert = await this.alertController.create({
        message: await this.translate.get('giver-form._ALREADY_REGISTER').toPromise(),
        buttons: [
          {
            text: await this.translate.get('giver-form._VIEW').toPromise(),
            handler: () => {
              let inquiryFormData = {};
              inquiryFormData[this.cmsTable.codeField] = formData[this.cmsTable.codeField];
              this.onChangeState('inquiry');
              // this.inquiryFormComponent.value = inquiryFormData;
              // this.inquiryFormComponent.onSubmit();
              return true;
            }
          }
        ]
      });

      alert.present();
      return;
    }

    try {
      let response = await this._giver.scan(event);
      formData['machineDispenseStatus'] = 'SUCCESS';
      formData['machineMessage'] = response;
    } catch (error) {
      formData['machineDispenseStatus'] = 'FAILED';
      formData['machineMessage'] = String(error) || 'Unknown Error';
    }
    let result = await this.cms.saveDocument(this.cmsTable, formData);
    let alert = await this.alertController.create({
      message: await this.translate.get('giver-form._REGISTER_SUCCESS').toPromise(),
      buttons: [
        {
          text: await this.translate.get('giver-form._VIEW').toPromise(),
          handler: () => {
            let inquiryFormData = {};
            inquiryFormData[this.cmsTable.codeField] = formData[this.cmsTable.codeField];
            this.onChangeState('inquiry');
            // this.inquiryFormComponent.value = inquiryFormData;
            // this.inquiryFormComponent.onSubmit();
            return true;
          }
        }
      ]
    });
    alert.present();
  }

  async onInquiry(event) {
    let validate = await this.inquiryFormComponent.validateFormAndShowErrorMessages();

    if (!validate.valid) {
      return;
    }

    let formData = event;
    this.inquiryResult = await this.cms.getDocument(this.cmsTable, formData[this.cmsTable.codeField]);
    console.log(this.inquiryResult)
  }

  onReset(event?) {
    this.inquiryResult = null;
  }

  onChangeState(state, event?) {
    this.state = state;
  }

  async onRetryMachine(formData, event?) {
    try {
      let response = await this._giver.scan(formData);
      formData['machineDispenseStatus'] = 'SUCCESS';
      formData['machineMessage'] = response;
    } catch (error) {
      formData['machineDispenseStatus'] = 'FAILED';
      formData['machineMessage'] = error.toString();
      alert(error);
    }
    await this.cms.saveDocument(this.cmsTable, formData);
  }

}

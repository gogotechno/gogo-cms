import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsListItem } from 'src/app/cms.type';

@Component({
  selector: 'winbox99-registration-steps',
  templateUrl: './registration-steps.component.html',
  styleUrls: ['./registration-steps.component.scss'],
})
export class RegistrationStepsComponent implements OnInit {

  registerList: CmsList;
  downloadList: CmsList;

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.registerList = await this.cms.getList('register-steps');
    this.downloadList = await this.cms.getList('download-steps');

  }

  onDownloadClick(item: CmsListItem) {

  }

}

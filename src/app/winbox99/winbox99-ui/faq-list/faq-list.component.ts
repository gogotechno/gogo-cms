import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/cms.service';
import { CmsList } from 'src/app/cms.type';

@Component({
  selector: 'winbox99-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit {

  faqList: CmsList;

  constructor(private cms: CmsService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.faqList = await this.cms.getList('faqs');
  }

}

import { Component, OnInit } from '@angular/core';
import { CmsComponent } from 'src/app/cms.component';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsNavigation, CmsSiteAttribute } from 'src/app/cms.type';
import { Winbox99Service } from '../../winbox99.service';

@Component({
  selector: 'winbox99-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends CmsComponent implements OnInit {

  list: CmsList;
  navigation: CmsNavigation;
  contactUs: CmsSiteAttribute;

  constructor(private cms: CmsService, private winbox99: Winbox99Service) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.list = await this.cms.getList('footers');
    this.navigation = await this.cms.getNavigation('top-nav');

    await this.winbox99.getAttributes();
    this.contactUs = this.winbox99.ATTRIBUTES.find((a) => a.code == "contact-us");
  }

  getContactUsOption(code: string) {
    let option = this.contactUs.options.find((o) => o.code == code);
    if (!option || !option.value) return null;
    return option;
  }

  getContactUsOptions() {
    return this.contactUs.options.filter((o) => o.code != "whatsapp" && o.code != "android" && o.code != "ios");
  }

}
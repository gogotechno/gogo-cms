import { Component, OnInit } from '@angular/core';
import { CmsSiteAttribute, CmsSiteAttributeOption } from 'src/app/cms.type';
import { Winbox99Service } from '../../winbox99.service';

@Component({
  selector: 'winbox99-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  websiteConfig: CmsSiteAttribute;
  logoUrl: string;
  loginUrl: string;

  constructor(
    private winbox99: Winbox99Service
  ) { }

  async ngOnInit() {
    await this.winbox99.getAttributes();
    this.websiteConfig = this.winbox99.ATTRIBUTES.find((a) => a.code == 'website-config');
    this.logoUrl = this.getOptionValue(this.websiteConfig, 'logo-url');
    this.loginUrl = this.getOptionValue(this.websiteConfig, 'login-url');
  }

  private getOptionValue(attr: CmsSiteAttribute, code: string) {
    const option = this.getOption(attr, code);
    return option ? option.value : null;
  }

  private getOption(attr: CmsSiteAttribute, code: string) {
    return attr.options.find((o) => o.code == code);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { CmsService } from 'src/app/cms.service';
import { CmsAdminChildPage, CmsTable } from 'src/app/cms.type';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.page.html',
  styleUrls: ['./databases.page.scss'],
  providers: [TranslatePipe]
})
export class DatabasesPage extends CmsAdminChildPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  list: Array<CmsTable> = [];

  constructor(private cms: CmsService, private translate: TranslatePipe) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.list = await this.cms.getTables();
    this.title = this.translate.transform('_DATABASES');
  }

}

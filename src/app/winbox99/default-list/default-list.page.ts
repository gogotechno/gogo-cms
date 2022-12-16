import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsListItem } from 'src/app/cms.type';
import { HtmlModalComponent } from '../winbox99-ui/html-modal/html-modal.component';

@Component({
  selector: 'app-default-list',
  templateUrl: './default-list.page.html',
  styleUrls: ['./default-list.page.scss'],
  providers: [CmsTranslatePipe],
})
export class DefaultListPage implements OnInit {

  list: CmsList;

  constructor(
    private route: ActivatedRoute,
    private cms: CmsService,
    private modalCtrl: ModalController,
    private cmsTranslate: CmsTranslatePipe,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    // let code = this.route.snapshot.data.listCode;


    const params = this.route.snapshot.params;
    this.list = await this.cms.getList(params.code);
    console.log(params);

    if (event) {
      (<RefresherCustomEvent>event).target.complete();
    }
  }

  async detail(item: CmsListItem, event?: Event) {
    const modal = await this.modalCtrl.create({
      component: HtmlModalComponent,
      componentProps: {
        title: this.cmsTranslate.transform(item.title),
        htmlContent: this.cmsTranslate.transform(item.htmlContent)
      }
    });

    await modal.present();
  }

}

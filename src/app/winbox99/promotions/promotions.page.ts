import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsListItem } from 'src/app/cms.type';
import { HtmlModalComponent } from '../winbox99-ui/html-modal/html-modal.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
  providers: [CmsTranslatePipe],
})
export class PromotionsPage implements OnInit {

  promotionList: CmsList;

  constructor(private cms: CmsService, private modalController: ModalController, private cmsTranslate: CmsTranslatePipe) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    this.promotionList = await this.cms.getList('games');
  }

  async detail(item: CmsListItem, event?: Event) {
    let modal = await this.modalController.create({component: HtmlModalComponent, componentProps: {htmlContent: this.cmsTranslate.transform(item.htmlContent), title: this.cmsTranslate.transform(item.title)}});
    await modal.present();
  }

}

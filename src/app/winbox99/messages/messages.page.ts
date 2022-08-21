import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsListItem } from 'src/app/cms.type';
import { HtmlModalComponent } from '../winbox99-ui/html-modal/html-modal.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
  providers: [CmsTranslatePipe],
})
export class MessagesPage implements OnInit {

  list: CmsList;

  constructor(private cms: CmsService, private modalController: ModalController, private cmsTranslate: CmsTranslatePipe, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(event?: Event) {
    console.log(this.route.snapshot.data);
    this.list = await this.cms.getList(this.route.snapshot.data.listCode);
    if (event) {
      (<RefresherCustomEvent>event).target.complete();
    }
  }

  async detail(item: CmsListItem, event?: Event) {
    let modal = await this.modalController.create({component: HtmlModalComponent, componentProps: {htmlContent: this.cmsTranslate.transform(item.htmlContent), title: this.cmsTranslate.transform(item.title)}});
    await modal.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsListItem } from 'src/app/cms.type';
import { HtmlModalComponent } from '../html-modal/html-modal.component';
import _ from 'lodash';

@Component({
  selector: 'winbox99-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  providers: [CmsTranslatePipe]
})
export class GameListComponent implements OnInit {

  gameList: CmsList;
  gameGroups: CmsListItem[][];

  constructor(
    private modalCtrl: ModalController,
    private cms: CmsService,
    private cmsTranslate: CmsTranslatePipe
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.gameList = await this.cms.getList('games');

    this.gameGroups = _.chunk(this.gameList.items, 9);
  }

  async gameDetail(game: CmsListItem, event?: Event) {
    let modal = await this.modalCtrl.create({
      component: HtmlModalComponent,
      componentProps: {
        title: this.cmsTranslate.transform(game.title),
        htmlContent: this.cmsTranslate.transform(game.htmlContent)
      }
    });

    await modal.present();
  }

}

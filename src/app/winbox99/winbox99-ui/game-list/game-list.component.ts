import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { CmsTranslatePipe } from 'src/app/cms-ui/cms.pipe';
import { CmsService } from 'src/app/cms.service';
import { CmsList, CmsListItem } from 'src/app/cms.type';
import { Winbox99Service } from '../../winbox99.service';
import { Winbox99Game } from '../../winbox99.type';
import { HtmlModalComponent } from '../html-modal/html-modal.component';

@Component({
  selector: 'winbox99-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  providers: [CmsTranslatePipe]
})
export class GameListComponent implements OnInit {

  // games: Array<Winbox99Game> = [];
  gameList: CmsList;

  constructor(private cms: CmsService, private modalController: ModalController, private cmsTranslate: CmsTranslatePipe) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.gameList = await this.cms.getList('games');
  }

  async gameDetail(game: CmsListItem, event?: Event) {
    let modal = await this.modalController.create({component: HtmlModalComponent, componentProps: {htmlContent: this.cmsTranslate.transform(game.htmlContent), title: this.cmsTranslate.transform(game.title)}});
    await modal.present();
  }

}

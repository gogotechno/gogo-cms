import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { SharedComponent } from 'src/app/jj/shared';
import { JJScratchAndWinEvent, JJScratchAndWinPrize } from 'src/app/jj/typings';
import { Pagination } from 'src/app/sws-erp.type';
import { Currency } from '../../../wallets/wallets.types';

@Component({
  selector: 'app-scratch-prizes',
  templateUrl: './scratch-prizes.component.html',
  styleUrls: ['./scratch-prizes.component.scss'],
})
export class ScratchPrizesComponent extends SharedComponent implements OnInit {
  eventId: number;
  event: JJScratchAndWinEvent;
  prizes: JJScratchAndWinPrize[];

  constructor(private modalCtrl: ModalController, private core: CoreService) {
    super();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.prizes = await this.core.getScratchAndWinPrizes({
      scratch_and_win_event_id: this.eventId,
      scratch_and_win_event_id_type: '=',
      isActive: 1,
      isActive_type: '=',
    });
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

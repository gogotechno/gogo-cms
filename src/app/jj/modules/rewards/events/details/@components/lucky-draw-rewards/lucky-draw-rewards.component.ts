import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import dayjs from 'dayjs';
import { JJEvent, JJEventPrize } from 'src/app/jj/typings';
import { DetailsService } from '../../@services/details.service';
import { LuckyDrawPrizeComponent } from '../lucky-draw-prize/lucky-draw-prize.component';
import { LuckyDrawResultComponent } from '../lucky-draw-result/lucky-draw-result.component';

@Component({
  selector: 'lucky-draw-rewards',
  templateUrl: './lucky-draw-rewards.component.html',
  styleUrls: ['./lucky-draw-rewards.component.scss'],
})
export class LuckyDrawRewardsComponent implements OnInit {
  event: JJEvent;
  resultModal: HTMLIonModalElement;
  prizeModal: HTMLIonModalElement;

  constructor(private details: DetailsService, private modalController: ModalController) {}

  async ngOnInit() {
    this.details.event.subscribe(async (event) => {
      this.event = event;
      if (this.event) {
        this.event._status = this.event.drewAt ? 'RESULT' : 'DRAWING';
        if (this.event.drawAt && dayjs().isBefore(this.event.drawAt)) {
          this.event._status = 'COUNTDOWN';
        }
      }
    });
  }

  /**
   * Open lucky draw result in modal
   */
  async openLuckyDrawResult(event?: Event) {
    this.resultModal = await this.modalController.create({
      component: LuckyDrawResultComponent,
      componentProps: {
        event: this.event,
      },
    });
    await this.resultModal.present();
  }

  /**
   * Open prize in modal
   *
   * @param prize
   * @param event
   */
  async openPrize(prize: JJEventPrize, event?: Event) {
    this.prizeModal = await this.modalController.create({
      component: LuckyDrawPrizeComponent,
      componentProps: {
        prize,
      },
    });
    await this.prizeModal.present();
  }
}

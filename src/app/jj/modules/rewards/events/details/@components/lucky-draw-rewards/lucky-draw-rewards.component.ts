import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  presentingElement;
  resultModal: HTMLIonModalElement;
  prizeModal: HTMLIonModalElement;

  constructor(
    private details: DetailsService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.details.event.subscribe(async (event) => {
      this.event = event;
      if (this.event) {
        this.event['_status'] = 'COUNTDOWN';
        if (this.event.drawAt !== null) {
          this.event['_status'] = 'RESULT';
        } else {
          this.event['_status'] = 'DRAWING';
        }
      }
      console.log(this.event);
    });
    this.presentingElement = document.querySelector('app-rewards.ion-page');
  }

  /**
   * Open lucky draw result in modal
   */
  async openLuckyDrawResult(event?) {
    this.resultModal = await this.modalController.create({
      component: LuckyDrawResultComponent,
      presentingElement: this.presentingElement,
      componentProps: {event: this.event},
    });
    await this.resultModal.present();
  }

  /**
   * Open prize in modal
   * @param prize 
   * @param event 
   */
  async openPrize(prize: JJEventPrize, event?) {
    this.prizeModal = await this.modalController.create({
      component: LuckyDrawPrizeComponent,
      presentingElement: this.presentingElement,
      componentProps: {prize: prize}
    });
    await this.prizeModal.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/jj/services';
import { JJScratchAndWinEvent, JJScratchAndWinPrize } from 'src/app/jj/typings';

@Component({
  selector: 'app-scratch-result',
  templateUrl: './scratch-result.component.html',
  styleUrls: ['./scratch-result.component.scss'],
})
export class ScratchResultComponent implements OnInit {
  event: JJScratchAndWinEvent;
  prize: JJScratchAndWinPrize;

  image: string;
  message: string;
  backgroundImage: string;

  constructor(private modalCtrl: ModalController, private core: CoreService) {}

  ngOnInit() {
    this.prize = this.core.populateScratchAndWinPrize(this.prize);
    this.image = this.prize.isDefault ? this.event.thankYouImage : this.event.congratulationImage;
    this.message = this.prize.isDefault ? this.event.thankYouMessage : this.event.congratulationMessage;
    this.backgroundImage = this.prize.isDefault
      ? this.event.thankYouBackgroundImage
      : this.event.congratulationBackgroundImage;
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

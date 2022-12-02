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

  constructor(private modalCtrl: ModalController, private core: CoreService) {}

  ngOnInit() {
    this.prize = this.core.populateScratchAndWinPrize(this.prize);
  }

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JJEventPrize } from 'src/app/jj/typings';

@Component({
  selector: 'app-lucky-draw-prize',
  templateUrl: './lucky-draw-prize.component.html',
  styleUrls: ['./lucky-draw-prize.component.scss'],
})
export class LuckyDrawPrizeComponent implements OnInit {

  prize: JJEventPrize;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  close(event?) {
    this.modalController.dismiss();
  }

}

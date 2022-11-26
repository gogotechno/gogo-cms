import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { JJLuckydrawService } from 'src/app/jj-luckydraw/jj-luckydraw.service';
import { JJEvent } from 'src/app/jj/typings';

@Component({
  selector: 'lucky-draw-result',
  templateUrl: './lucky-draw-result.component.html',
  styleUrls: ['./lucky-draw-result.component.scss'],
})
export class LuckyDrawResultComponent implements OnInit {

  @Input() event: JJEvent;

  constructor(private modalController: ModalController, private jj: JJLuckydrawService) { }

  ngOnInit() { }

  loadData(event?) {
    // this.jj.
  }

  close(event?) {
    this.modalController.dismiss();
  }

}

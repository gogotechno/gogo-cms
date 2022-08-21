import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-html-modal',
  templateUrl: './html-modal.component.html',
  styleUrls: ['./html-modal.component.scss'],
})
export class HtmlModalComponent implements OnInit {

  htmlContent: string;
  title: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss(event?: Event) {
    this.modalController.dismiss();
  }

}

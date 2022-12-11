import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],
})
export class ContentBoxComponent implements OnInit {
  title: string;
  content: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  images: string[];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async onDismiss() {
    await this.modalCtrl.dismiss();
  }
}

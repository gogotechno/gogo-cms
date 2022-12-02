import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventStatus, JJScratchAndWinEvent, JJScratchAndWinEventPrize } from 'src/app/jj/typings';

@Component({
  selector: 'app-scratch-result',
  templateUrl: './scratch-result.component.html',
  styleUrls: ['./scratch-result.component.scss'],
})
export class ScratchResultComponent implements OnInit {

  event: JJScratchAndWinEvent = {
    name: 'Scratch and Win',
    highlight: '',
    description: '',
    tnc: '',
    status: EventStatus.ACTIVE,
    startAt: undefined,
    endAt: undefined,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgXq77y_8Q3-HAjp4yDKV1DQ2vHiYu2EBZew&usqp=CAU',
    coverImage: '',
    backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsvA5K8aKI_jjMyyFE5cxxuubj-zRcxpXl1A&usqp=CAU',
    scratchBackgroundImage: '',
    scratchPlaceholderImage: '',
    distance: '',
  };

  prizes: JJScratchAndWinEventPrize[] = [
    {
      name: 'Voucher',
      description: 'Worth',
      thumbnailImage: 'https://image.winudf.com/v2/image1/c2NyYXRjaC53aW4uc2NyYXRjaC5jYXJkMV9zY3JlZW5fMF8xNTU5MTE1NjY4XzA1Mg/screen-0.jpg?fakeurl=1&type=.jpg',
      worth: 1000,
      scratch_and_win_event_id: 1,
    }
  ]

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async OnClosing() {
    await this.modalCtrl.dismiss();
  }
}

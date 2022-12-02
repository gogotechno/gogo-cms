import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventStatus, JJScratchAndWinEvent, JJScratchAndWinEventPrize } from 'src/app/jj/typings';

@Component({
  selector: 'app-scratch-prizes',
  templateUrl: './scratch-prizes.component.html',
  styleUrls: ['./scratch-prizes.component.scss'],
})
export class ScratchPrizesComponent implements OnInit {

  event: JJScratchAndWinEvent = {
    name: 'Scratch and Win',
    highlight: '',
    description: '',
    tnc: '',
    status: EventStatus.ACTIVE,
    startAt: undefined,
    endAt: undefined,
    logo: 'https://cdn.shopify.com/app-store/listing_images/c6f8970d63d49bc8a5992dec76e3145e/banner/COG-5aX0lu8CEAE=.jpg',
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
      thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
      worth: 1000,
      scratch_and_win_event_id: 1,
    },
    {
      name: 'Voucher',
      description: 'Worth',
      thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
      worth: 100,
      scratch_and_win_event_id: 2,
    },
    {
      name: 'Voucher',
      description: 'Worth',
      thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
      worth: 200,
      scratch_and_win_event_id: 3,
    },
    {
      name: 'Voucher',
      description: 'Worth',
      thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
      worth: 300,
      scratch_and_win_event_id: 4,
    },
    {
      name: 'Voucher',
      description: 'Worth',
      thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
      worth: 50,
      scratch_and_win_event_id: 5,
    },
    {
      name: 'Voucher',
      description: 'Worth',
      thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
      worth: 1000,
      scratch_and_win_event_id: 6,
    }
  ]

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async OnClosing() {
    await this.modalCtrl.dismiss();

  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventStatus, JJScratchAndWinEvent, JJScratchAndWinPrize } from 'src/app/jj/typings';

@Component({
  selector: 'app-scratch-result',
  templateUrl: './scratch-result.component.html',
  styleUrls: ['./scratch-result.component.scss'],
})
export class ScratchResultComponent implements OnInit {
  // prettier-ignore
  event: JJScratchAndWinEvent = {
    name: '2023农历新年刮刮乐',
    startAt: new Date(),
    endAt: new Date('2022-12-30'),
    tnc: '条规与条款',
    isActive: true,
    pricePerScratch: 100,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwM-V7-pw_qvfRzyXygdmg_7BrUdFjqEVRRIWfr08kwfdMPIlNNdTRXaDu-iNWO5O4rzk&usqp=CAU',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6VlOskx6ulEWYRLIUCL7cVNQjH9-1u7u5YA&usqp=CAU',
    backgroundImage: 'https://c4.wallpaperflare.com/wallpaper/298/976/941/texture-spots-purple-background-wallpaper-preview.jpg',
    cardBackgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLkOamLTTnVpKGvquzQiZUEzvlalHp1JLcapjO9Qq8qQ&s',
    scratchAreaPlaceholderImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZe-4nVoJaHkaxcQ8sqZYzu7QX1PxWj0_PnA&usqp=CAU',
    congratulationImage: "",
    congratulationMessage: "",
    thankYouImage:"",
    thankYouMessage: "",
    distance: 2.9,
  };

  prizes: JJScratchAndWinPrize[] = [
    // {
    //   name: 'Voucher',
    //   description: 'Worth',
    //   thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
    //   worth: 1000,
    //   scratch_and_win_event_id: 1,
    // },
    // {
    //   name: 'Voucher',
    //   description: 'Worth',
    //   thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
    //   worth: 100,
    //   scratch_and_win_event_id: 2,
    // },
    // {
    //   name: 'Voucher',
    //   description: 'Worth',
    //   thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
    //   worth: 200,
    //   scratch_and_win_event_id: 3,
    // },
    // {
    //   name: 'Voucher',
    //   description: 'Worth',
    //   thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
    //   worth: 300,
    //   scratch_and_win_event_id: 4,
    // },
    // {
    //   name: 'Voucher',
    //   description: 'Worth',
    //   thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
    //   worth: 50,
    //   scratch_and_win_event_id: 5,
    // },
    // {
    //   name: 'Voucher',
    //   description: 'Worth',
    //   thumbnailImage: 'https://m8r8j2c8.stackpathcdn.com/real/imglandingscratchandwin_1.webp',
    //   worth: 1000,
    //   scratch_and_win_event_id: 6,
    // },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async OnClosing() {
    await this.modalCtrl.dismiss();
  }
}

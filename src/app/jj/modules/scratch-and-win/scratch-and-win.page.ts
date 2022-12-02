import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountdownTimer, SharedComponent } from '../../shared';
import { EventStatus, JJScratchAndWinEvent } from '../../typings';
import { ScratchPrizesComponent } from './@components/scratch-prizes/scratch-prizes.component';
import { ScratchResultComponent } from './@components/scratch-result/scratch-result.component';

@Component({
  selector: 'app-scratch-and-win',
  templateUrl: './scratch-and-win.page.html',
  styleUrls: ['./scratch-and-win.page.scss'],
})
export class ScratchAndWinPage extends SharedComponent implements OnInit {
  timer: CountdownTimer;

  event: JJScratchAndWinEvent = {
    name: '2023农历新年刮刮乐',
    highlight: '',
    description: '龙镇手机店',
    tnc: '条规与条款',
    status: EventStatus.ACTIVE,
    startAt: new Date(),
    endAt: new Date('2022-12-30'),
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwM-V7-pw_qvfRzyXygdmg_7BrUdFjqEVRRIWfr08kwfdMPIlNNdTRXaDu-iNWO5O4rzk&usqp=CAU',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6VlOskx6ulEWYRLIUCL7cVNQjH9-1u7u5YA&usqp=CAU',
    backgroundImage: 'https://c4.wallpaperflare.com/wallpaper/298/976/941/texture-spots-purple-background-wallpaper-preview.jpg',
    scratchBackgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLkOamLTTnVpKGvquzQiZUEzvlalHp1JLcapjO9Qq8qQ&s',
    scratchPlaceholderImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZe-4nVoJaHkaxcQ8sqZYzu7QX1PxWj0_PnA&usqp=CAU',
    distance: '距离2.9公里',
  };

  messages: string[] = ['Message one', 'Message two', 'Message three', 'Message four'];

  constructor(private modalCtrl: ModalController) {
    super();
    this.timer = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    let endDate = new Date(this.event.endAt);
    let interval: number = 1000;
    let timer = setInterval(() => {
      let { time, days, hours, minutes, seconds } = this.getDateDiff(endDate);
      if (time > 0) {
        this.timer = {
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        };
      } else {
        clearInterval(timer);
      }
    }, interval);
  }

  async openPrizes() {
    const modal = await this.modalCtrl.create({
      component: ScratchPrizesComponent,
    });

    await modal.present();
  }

  async openResult() {
    const modal = await this.modalCtrl.create({
      component: ScratchResultComponent,
      cssClass: 'scratch-result-modal',
    });

    await modal.present();
  }
}

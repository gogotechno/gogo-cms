import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { CmsService } from 'src/app/cms.service';
import { CmsForm } from 'src/app/cms.type';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-free-gift',
  templateUrl: './free-gift.page.html',
  styleUrls: ['../tastefully.scss', './free-gift.page.scss'],
})
export class FreeGiftPage implements OnInit {
  
  @ViewChild(IonModal) modal: IonModal;
  form: CmsForm;
  presentingElement = null;
  config: CountdownConfig = {leftTime: 1000000000}

  constructor(private cms: CmsService, private router: Router) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('app-free-gift');
    this.loadData();
  }

  handleEvent(event) {
    console.log(event)
  }

  async loadData(event?: Event) {
    this.form = await this.cms.getForm('free-gift-registers');
  }

  async freeGiftRegister(data: any) {
    
  }

  onWillDismiss(event?: Event) {

  }

  cancel() {
    this.modal.dismiss();
  }
}

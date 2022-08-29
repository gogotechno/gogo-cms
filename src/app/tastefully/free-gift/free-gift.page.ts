import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { CmsService } from 'src/app/cms.service';
import { CmsForm, CmsTable } from 'src/app/cms.type';
import { IonModal, RefresherCustomEvent } from '@ionic/angular';
import { TastefullyCustomer, TastefullyEvent, TastefullyFreeGiftRegister } from '../tastefully.type';
import { FormComponent } from 'src/app/cms-ui/form/form.component';
import { AppUtils, getTime } from 'src/app/cms.util';
import { TastefullyService } from '../tastefully.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-free-gift',
  templateUrl: './free-gift.page.html',
  styleUrls: ['../tastefully.scss', './free-gift.page.scss'],
})
export class FreeGiftPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(FormComponent) cmsForm: FormComponent;
  @ViewChild("cd") countdown: CountdownComponent;

  readonly CURRENT_CUSTOMER: TastefullyCustomer;

  form: CmsForm;
  table: CmsTable;
  value: TastefullyFreeGiftRegister;

  type: "today" | "incoming";
  event: TastefullyEvent;
  register: TastefullyFreeGiftRegister;

  presentingElement = null;
  config: CountdownConfig;

  eventNotFound: boolean;

  constructor(private app: AppUtils, private cms: CmsService, private tastefully: TastefullyService) {
    this.CURRENT_CUSTOMER = this.tastefully.CURRENT_CUSTOMER;
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('app-free-gift');
    this.loadData();
  }

  async loadData(refresher?: Event) {
    this.form = await this.cms.getForm('free-gift-registers');
    this.value = { name: this.CURRENT_CUSTOMER.name, mobileNo: this.CURRENT_CUSTOMER.mobileNo };

    this.table = await this.cms.getTable('free-gift-registers');

    let events = await this.tastefully.getEvents((ref) => ref.where("organisedAt", "==", dayjs().format("YYYY-MM-DD")));
    if (events.length > 0) {
      let ev = events[0];
      let registers = await this.tastefully.getRegisters((ref) => ref.where("mobileNo", "==", this.CURRENT_CUSTOMER.mobileNo).where("eventCode", "==", ev.code));
      this.register = registers.length > 0 ? registers[0] : null;
      this.type = "today";
      this.event = ev;
    } else {
      events = await this.tastefully.getEvents((ref) => ref.where("organisedAt", ">", dayjs().format("YYYY-MM-DD")));
      if (events.length > 0) {
        let ev = events[0];
        let startTime = getTime(ev.startAt);
        let organisedAt = dayjs(ev.organisedAt).set("hour", startTime.hour).set("minute", startTime.minute);
        this.config = {
          leftTime: organisedAt.diff(dayjs(), "seconds"),
          formatDate: ({ date, formatStr }) => {
            let duration = Number(date || 0);
            return CountdownTimeUnits.reduce((current, [name, unit]) => {
              if (current.indexOf(name) !== -1) {
                const v = Math.floor(duration / unit);
                duration -= v * unit;
                return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
                  return v.toString().padStart(match.length, '0');
                });
              }
              return current;
            }, formatStr);
          }
        };
        this.type = "incoming";
        this.event = ev;
      }
    }

    if (!this.event) {
      this.eventNotFound = true;
    }

    if (refresher) {
      (<RefresherCustomEvent>refresher).target.complete();
    }
  }

  handleEvent(event?: Event) {
    console.log(event);
  }

  async cancel() {
    await this.modal.dismiss();
  }

  async freeGiftRegister(data: TastefullyFreeGiftRegister) {
    let validation = await this.cmsForm.validateForm();
    if (!validation.valid) {
      let messages = validation.errors.map((e) => "<p class='ion-no-margin'>" + e.message + "</p>").join("");
      this.app.presentAlert(messages, "_ERROR");
      return;
    }

    data.eventCode = this.event.code;
    const result = await this.tastefully.saveFreeGiftRegister(this.table, data);
    if (result) {
      this.register = result;
      await this.cancel();
    }
  }

  openModal() {
    let trigger = document.getElementById("open-modal");
    trigger.click();
  }

}

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];
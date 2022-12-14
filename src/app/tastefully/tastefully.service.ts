import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { map, take } from 'rxjs/operators';
import { CmsService } from '../cms.service';
import { CmsSite, CmsSiteAttribute, CmsTable } from '../cms.type';
import { AppUtils } from '../cms.util';
import { TastefullyCustomer, TastefullyEvent, TastefullyFeed, TastefullyFreeGiftActivation, TastefullyFreeGiftRegister } from './tastefully.type';

@Injectable({
  providedIn: 'root'
})
export class TastefullyService {

  private readonly SITE: CmsSite;
  private _ATTRIBUTES: CmsSiteAttribute[];
  private _CURRENT_CUSTOMER: TastefullyCustomer;

  get ATTRIBUTES() {
    return this._ATTRIBUTES;
  }

  set CURRENT_CUSTOMER(customer: TastefullyCustomer) {
    this._CURRENT_CUSTOMER = customer;
  }

  get CURRENT_CUSTOMER() {
    if (this._CURRENT_CUSTOMER) {
      if (!this._CURRENT_CUSTOMER.profilePic) {
        this._CURRENT_CUSTOMER.profilePic = '/assets/avatar-placeholder.png';
      }
    }
    return this._CURRENT_CUSTOMER;
  }

  constructor(private firestore: AngularFirestore, private cms: CmsService, private app: AppUtils) {
    dayjs.extend(relativeTime);
    this.SITE = this.cms.SITE;
  }

  getFeeds() {
    const queryFn: QueryFn = (ref) => ref.orderBy('createdAt', 'desc');
    return this.firestore.collection<TastefullyFeed>('sites/' + this.SITE.code + '/feeds', queryFn)
      .valueChanges()
      .pipe(
        take(1),
        map((feeds) => feeds.map((feed) => {
            feed.fromNow = dayjs.unix(feed.createdAt.seconds).fromNow();
            return feed;
          }))
      ).toPromise();
  }

  getEvents(queryFn?: QueryFn) {
    return this.firestore.collection<TastefullyEvent>('sites/' + this.SITE.code + '/events', queryFn)
      .valueChanges()
      .pipe(
        take(1),
        map((events) => events.map((event) => {
            event.stateLogo = '/assets/tastefully/cities/' + event.stateCode + '.jpg';
            return event;
          }))
      ).toPromise();
  }

  getRegisters(queryFn?: QueryFn) {
    return this.firestore.collection<TastefullyFreeGiftRegister>('sites/' + this.SITE.code + '/free-gift-registers', queryFn)
      .valueChanges()
      .pipe(
        take(1)
      ).toPromise();
  }

  getActivations(queryFn?: QueryFn) {
    return this.firestore.collection<TastefullyFreeGiftActivation>('sites/' + this.SITE.code + '/free-gift-activations', queryFn)
      .valueChanges()
      .pipe(
        take(1)
      ).toPromise();
  }

  async getAttributes() {
    this._ATTRIBUTES = await this.cms.getAttributes();
  }

  getCustomers(queryFn?: QueryFn) {
    return this.firestore.collection<TastefullyCustomer>('sites/' + this.SITE.code + '/customers', queryFn)
      .valueChanges()
      .pipe(
        take(1)
      ).toPromise();
  }

  async saveFreeGiftRegister(table: CmsTable, data: TastefullyFreeGiftRegister) {
    await this.app.presentLoading();
    try {
      const result = await this.cms.saveDocument(table, data);
      const created = await this.cms.getDocument(table, result.id);
      return created;
    } catch (err) {
      await this.app.presentAlert('tastefully._ERROR_WHILE_PROCESSING_REGISTER', '_ERROR');
      console.error(err);
      return null;
    } finally {
      await this.app.dismissLoading();
    }
  }

  async saveFreeGiftActivation(table: CmsTable, data: TastefullyFreeGiftActivation) {
    await this.app.presentLoading();
    try {
      const result = await this.cms.saveDocument(table, data);
      const created = await this.cms.getDocument(table, result.id);
      return created;
    } catch (err) {
      await this.app.presentAlert('tastefully._ERROR_WHILE_PROCESSING_ACTIVATION', '_ERROR');
      console.error(err);
      return null;
    } finally {
      await this.app.dismissLoading();
    }
  }

  async saveCustomer(table: CmsTable, data: TastefullyCustomer, id?: string) {
    try {
      const result = await this.cms.saveDocument(table, data, id);
      const created = await this.cms.getDocument(table, result.id);
      return created;
    } catch (err) {
      const errorMessage = id ? 'tastefully._ERROR_WHILE_UPDATING_CUSTOMER_PROFILE' : 'tastefully._ERROR_WHILE_CREATING_CUSTOMER_PROFILE';
      await this.app.presentAlert(errorMessage, '_ERROR');
      console.error(err);
      return null;
    }
  }
}

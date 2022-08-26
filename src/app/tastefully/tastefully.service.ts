import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { map, take } from 'rxjs/operators'
import { CmsService } from '../cms.service';
import { CmsSite } from '../cms.type';
import { TastefullyEvent, TastefullyFeed } from './tastefully.type';

@Injectable({
  providedIn: 'root'
})
export class TastefullyService {

  constructor(private firestore: AngularFirestore, private cms: CmsService) {
    dayjs.extend(relativeTime);
  }

  async getFeeds() {
    return await this.firestore.collection<TastefullyFeed>("sites/tastefully/feeds", (ref) => {
      ref.orderBy("createdAt", "desc");
      return ref;
    }).valueChanges().pipe(
      take(1),
      map((feeds) => {
        return feeds.map((feed) => {
          feed.fromNow = dayjs.unix(feed.createdAt.seconds).fromNow();
          return feed;
        })
      })
    ).toPromise();
  }

  async getEvents() {
    return await this.firestore.collection<TastefullyEvent>("sites/tastefully/events", (ref) => {
      ref.orderBy("startAt", "desc");
      ref.where("startAt", ">=", dayjs().format());
      return ref;
    }).valueChanges().pipe(
      take(1)
    ).toPromise();
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { take } from 'rxjs/operators';
import { CmsService } from '../cms.service';
import { CmsSiteAttribute } from '../cms.type';
import { Winbox99Game } from './winbox99.type';

@Injectable({
  providedIn: 'root'
})
export class Winbox99Service {

  private _ATTRIBUTES: CmsSiteAttribute[];
  public get ATTRIBUTES() {
    return this._ATTRIBUTES;
  }

  constructor(private firestore: AngularFirestore, private cms: CmsService) { }

  async getAttributes() {
    this._ATTRIBUTES = await this.cms.getAttributes();
  }

  getGames() {
    return this.firestore.collection<Winbox99Game>('online-casinos').valueChanges().pipe(
      take(1)
    ).toPromise();
  }
}

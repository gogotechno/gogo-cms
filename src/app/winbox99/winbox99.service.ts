import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { take } from 'rxjs/operators';
import { Winbox99Game } from './winbox99.type';

@Injectable({
  providedIn: 'root'
})
export class Winbox99Service {

  constructor(private firestore: AngularFirestore) { }

  getGames() {
    return this.firestore.collection<Winbox99Game>('online-casinos').valueChanges().pipe(
      take(1)
    ).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { first, map, take } from 'rxjs/operators'

import { CmsList, CmsNavigation, CmsPage, CmsSite, CmsSlideshow } from './cms.type';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  public SITE: CmsSite;

  constructor(private firestore: AngularFirestore) { }  

  getSite(hostname?: string) {
    if (!hostname) {
      hostname = document.location.hostname;
    }
    return this.firestore.collection<CmsSite>('sites', ref => ref.where('domains', 'array-contains', hostname)).valueChanges().pipe(
      take(1),
      map((value) => value[0])
    ).toPromise();
  }

  getNavigation(id: string) {
    return this.firestore.doc<CmsNavigation>(`sites/${this.SITE.code}/navigations/${id}`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  getSlideshow(id: string) {
    return this.firestore.doc<CmsSlideshow>(`sites/${this.SITE.code}/slideshows/${id}`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  getList(id: string) {
    return this.firestore.doc<CmsList>(`sites/${this.SITE.code}/lists/${id}`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  getPage(id: string) {
    return this.firestore.doc<CmsPage>(`sites/${this.SITE.code}/pages/${id}`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }
}

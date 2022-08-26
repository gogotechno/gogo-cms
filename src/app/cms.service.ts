import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators'
import { CmsExternalIntegration, CmsForm, CmsList, CmsNavigation, CmsPage, CmsSite, CmsSlideshow, CmsTable } from './cms.type';

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

  getForm(id: string) {
    return this.firestore.doc<CmsForm>(`forms/${id}`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  getTable(id: string) {
    return this.firestore.doc<CmsTable>(`tables/${id}`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  getTables() {
    // if (this.SITE.code != 'default') {
    //   return this.firestore.collection<CmsTable>(`tables`, ref => ref.where('site', '==', this.SITE.code)).valueChanges().pipe(
    //     take(1),
    //   ).toPromise();
    // }

    return this.firestore.collection<CmsTable>(`tables`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  getTableData(table: CmsTable) {
    let collectionPath = table.code;
    if (table.site != 'default') {
      collectionPath = `sites/${this.SITE.code}/${collectionPath}`;
    }
    return this.firestore.collection<any>(collectionPath).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  getDocument(table: CmsTable, id: string) {
    let collectionPath = table.code;
    if (table.site != 'default') {
      collectionPath = `sites/${this.SITE.code}/${collectionPath}`;
    }
    return this.firestore.doc<any>(`${collectionPath}/${id}`).valueChanges().pipe(
      take(1),
    ).toPromise();
  }

  async saveDocument(table: CmsTable, document: any, id?: string) {
    let collectionPath = table.code;
    if (table.site != 'default') {
      collectionPath = `sites/${this.SITE.code}/${collectionPath}`;
    }
    if (id) {
      await this.firestore.doc<any>(`${collectionPath}/${id}`).update(document);
    } else {
      id = document['code'] || document[table.codeField];
      await this.firestore.collection<any>(collectionPath).doc(id).set(document);
    }

    let result = {
      id: id
    }
    return result;
  }

  isTranslationObject(obj: any) {
    if (!(obj instanceof Object)) {
      return false;
    }
    return 'en' in obj;
  }

  getExternalIntegration(code?: string) {
    let queryFn: QueryFn = (ref) => {
      if (code) {
        ref.where("code", "==", code);
      }
      return ref;
    };

    return this.firestore.collection<CmsExternalIntegration>("external-integration", queryFn).valueChanges().pipe(
      take(1)
    ).toPromise();
  }
}
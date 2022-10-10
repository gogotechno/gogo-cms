import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) { }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  get(key: string) {
    return this._storage?.get(key);
  }

  remove(key: string) {
    return this._storage?.remove(key);
  }

  clear() {
    return this._storage?.clear();
  }
}

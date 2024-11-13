import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage<T>(key: string, value: T):void {
    if (!key) {
      throw 'key is required!';
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getLocalStorage(key: string) {
    const item:string|null = localStorage.getItem(key);
    if (!item) {
      return null;
    } else {
      return JSON.parse(item);
    }
  }

  clearLocalStorage(key: string | null):void {
    if (!key) {
      localStorage.clear();
    } else {
      localStorage.removeItem(key);
    }
  }
}

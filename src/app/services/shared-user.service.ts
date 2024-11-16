import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedUserService {

  constructor() { }

  private user = new BehaviorSubject<string>('');

  setSharedUser(data: string) {
    this.user.next(data);
  }

  getSharedUser() {
    return this.user.asObservable();
  }
}

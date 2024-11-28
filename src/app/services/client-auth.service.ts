import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {LocalStorageUser} from "../models/local-storage-user";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ClientAuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$:Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private localStorageService: LocalStorageService,private router: Router) {
    const login:boolean = this.isLoggedIn();
    if (login){
      this.loggedInSubject.next(true);
    }
  }

  private getClientLists(): LocalStorageUser[] {
    return this.localStorageService.getLocalStorage('client-users');
  }

  login(phone: number, password: string): void {
    const prevClient: Array<LocalStorageUser> = this.getClientLists();

    if (prevClient && prevClient.length > 0) {
      const client:LocalStorageUser|undefined = prevClient.find(
        (client: LocalStorageUser) =>
          client.phoneNumber === phone
      )
      if (client) {
        if (client.password === password) {
          this.localStorageService.setLocalStorage<boolean>('isClientLoggedIn', true);
          this.loggedInSubject.next(true);
          this.router.navigate(['/client/products']);
          return;
        } else {
          alert('رمز عبور اشتباه است')
          return;
        }
      }
      alert('کاربر یافت نشد');
    }
  }

  register(
    firstName: string,
    lastName: string,
    phoneNumber: number,
    password: string
  ):void {
    const prevClient: Array<LocalStorageUser> = this.getClientLists();
    const ClientId: number = prevClient ? prevClient.length + 1 : 1;
    const clientObj:any = {
      id: ClientId,
      name: firstName + " " + lastName,
      phoneNumber: phoneNumber,
      password: password,
    };

    if (prevClient && prevClient.length > 0) {
      prevClient.push(clientObj);
      this.localStorageService.setLocalStorage<Array<LocalStorageUser>>('client-users', prevClient);
    } else {
      this.localStorageService.setLocalStorage<Array<LocalStorageUser>>('client-users', [
        clientObj,
      ]);
    }
    this.localStorageService.setLocalStorage<boolean>('isClientLoggedIn', true);
    this.loggedInSubject.next(true);
    alert(`Welcome ${firstName}`);
  }

  logout(): void {
    this.localStorageService.setLocalStorage<boolean>('isClientLoggedIn', false);
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getLocalStorage('isClientLoggedIn');
  }
}

import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageUser } from '../models/local-storage-user';
import { Router } from '@angular/router';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUsername: string | null = null;
  private loggedInSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}


  private getUserLists(): LocalStorageUser[] {
    return this.localStorageService.getLocalStorage('users');
  }

  login(username: string, password: string):void {
    const prevUsers: Array<LocalStorageUser> = this.getUserLists();

    if (prevUsers && prevUsers.length > 0) {
      const user = prevUsers.find(
        (user: LocalStorageUser) =>
          user.username === username && user.password === password
      );

      if (user) {
        this.currentUsername=user.name;
        this.localStorageService.setLocalStorage<boolean>('isLoggedIn', true);
        this.loggedInSubject.next(true);
        this.router.navigate(['/user-list']);
        return;
      }
    }
    alert('نام کاربری یا رمز عبور اشتباه است');
  }

  register(
    firstName:string,
    lastName:string,
    username:string,
    email: string,
    phoneNumber: number,
    password: string
  ) {
    const prevUsers: Array<LocalStorageUser> = this.getUserLists();
    const userId:number = prevUsers ? prevUsers.length + 1 : 11;
    const userObj: LocalStorageUser = {
      id: userId,
      name: firstName + " " + lastName,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };

    if (prevUsers && prevUsers.length > 0) {
      prevUsers.push(userObj);
      this.localStorageService.setLocalStorage<Array<LocalStorageUser>>(
        'users',
        prevUsers
      );
    } else {
      this.localStorageService.setLocalStorage<Array<LocalStorageUser>>('users', [
        userObj,
      ]);
    }
    this.currentUsername = firstName + " " + lastName;
    this.localStorageService.setLocalStorage<boolean>('isLoggedIn', true);
    this.loggedInSubject.next(true);
    this.router.navigate(['/user-list']);
    alert(`Welcome ${username}`);
  }

  logout():void {
    this.currentUsername =null;
    this.localStorageService.setLocalStorage<boolean>('isLoggedIn', false);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUsername(): string | null {
    return this.currentUsername;
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getLocalStorage('isLoggedIn');
  }

}

import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {LocalStorageUser} from '../models/local-storage-user';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$:Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    const login:boolean = this.isLoggedIn();
    if (login){
      this.loggedInSubject.next(true);
    }
  }

  private getUserLists(): LocalStorageUser[] {
    return this.localStorageService.getLocalStorage('users');
  }

  login(username: string, password: string): void {
    const prevUsers: Array<LocalStorageUser> = this.getUserLists();

    if (prevUsers && prevUsers.length > 0) {
      const user:LocalStorageUser|undefined = prevUsers.find(
        (user: LocalStorageUser) =>
          user.username === username
      )
      if (user) {
        if (user.password === password) {
          this.localStorageService.setLocalStorage<boolean>('isLoggedIn', true);
          this.localStorageService.setLocalStorage('user', user.name);
          this.loggedInSubject.next(true);
          this.router.navigate(['admin/user-list']);
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
    username: string,
    email: string,
    phoneNumber: number,
    password: string
  ):void {
    const prevUsers: Array<LocalStorageUser> = this.getUserLists();
    const userId: number = prevUsers ? prevUsers.length + 1 : 11;
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
      this.localStorageService.setLocalStorage<Array<LocalStorageUser>>('users', prevUsers);
    } else {
      this.localStorageService.setLocalStorage<Array<LocalStorageUser>>('users', [
        userObj,
      ]);
    }

    this.localStorageService.setLocalStorage<boolean>('isLoggedIn', true);
    this.localStorageService.setLocalStorage('user', name);
    this.loggedInSubject.next(true);
    this.router.navigate(['admin/user-list']);
    alert(`Welcome ${username}`);
  }

  logout(): void {
    this.localStorageService.setLocalStorage<boolean>('isLoggedIn', false);
    this.localStorageService.clearLocalStorage('user')
    this.loggedInSubject.next(false);
    this.router.navigate(['auth/login']);
  }

  getCurrentUsername(): string | null {
    return this.localStorageService.getLocalStorage('user');
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getLocalStorage('isLoggedIn');
  }

}

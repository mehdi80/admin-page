import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageUser } from '../models/local-storage-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  private getUserLists(): LocalStorageUser[] {
    return this.localStorageService.getLocalStorage('users');
  }

  login(username: string, password: string) {
    const prevUsers: Array<LocalStorageUser> = this.getUserLists();

    if (prevUsers && prevUsers.length > 0) {
      const user = prevUsers.find(
        (user: LocalStorageUser) =>
          user.username === username && user.password === password
      );

      if (user) {
        this.localStorageService.setLocalStorage<boolean>('isLoggedIn', true);
        this.router.navigate(['/user-list']);
        return;
      }
    }
    alert('نام کاربری یا رمز عبور اشتباه است');
  }

  register(
    name: string,
    lastName: string,
    username: string,
    email: string,
    phoneNumber: number,
    password: string
  ) {
    const prevUsers: Array<LocalStorageUser> = this.getUserLists();
    const userId = prevUsers ? prevUsers.length + 1 : 1;
    const userObj: LocalStorageUser = {
      id: userId,
      name: name,
      lastName: lastName,
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

    this.localStorageService.setLocalStorage<boolean>('isLoggedIn', true);
    this.router.navigate(['/']);
    alert(`Welcome ${username}`);
  }

  logout() {
    this.localStorageService.setLocalStorage<boolean>('isLoggedIn', false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.localStorageService.getLocalStorage('isLoggedIn');
  }
}

import { Injectable } from '@angular/core';
import {forkJoin, map, Observable} from "rxjs";
import {LocalStorageUser} from "../models/local-storage-user";
import {UsersApi} from "../models/api-user";
import {ApiUserService} from "./api-user.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MergeUserService {

  constructor(
    private apiUser: ApiUserService,
    private localStorageUserService: LocalStorageService
  ) {}

  getCombinedUsers():Observable<(LocalStorageUser|UsersApi)[]>{
    return forkJoin([
      new Observable<LocalStorageUser[]>(observer => {
        observer.next(this.localStorageUserService.getLocalStorage('users'));
        observer.complete();
      }),
      this.apiUser.getUsers(),
    ]).pipe(
      map(([localStorageUsers, apiUsers]) => {
        return [...localStorageUsers, ...apiUsers];
      })
    )
  }
}

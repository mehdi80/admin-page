import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageUser} from "../models/local-storage-user";
import {UsersApi} from "../models/api-user";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) {
  }

  private url: string = "https://jsonplaceholder.typicode.com/users"

   getUsers(): Observable<UsersApi[]> {

    return this.http.get<UsersApi[]>(this.url);
  }

  CreateUser(user: LocalStorageUser): Observable<LocalStorageUser> {
    const headers:HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    return this.http.post<LocalStorageUser>(this.url, user, { headers});
  }

  // getSearchUser(query:any):Observable<object> {
  //   return  this.http.get(`${this.url}?query=${query}`);
  // }

  updateUser(user:any,userId:string):Observable<LocalStorageUser>{
    const putUrl: string =`${this.url}/${userId}`;
    const headers:HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    return this.http.put<LocalStorageUser>(putUrl,user,{headers})
  }

}

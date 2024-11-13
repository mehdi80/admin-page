import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel, UsersApi} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) {
  }

  private url: string = "https://jsonplaceholder.typicode.com/users"

  getUsers(): Observable<UsersApi[]> {
    return  this.http.get<UsersApi[]>(this.url);
  }

  CreateUser(user: UserModel): Observable<UserModel> {
    const headers:HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    return this.http.post<UserModel>(this.url, user, { headers});
  }

  // getSearchUser(query:any):Observable<object> {
  //   return  this.http.get(`${this.url}?query=${query}`);
  // }

  updateUser(data:any,userId:string):Observable<any>{
    const putUrl: string =`${this.url}/${userId}`;
    const headers:HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    return this.http.put<any>(putUrl,data,{headers})
  }

}

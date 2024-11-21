import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/products";

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor( private http: HttpClient) { }


  private url: string = "./products.json"


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}

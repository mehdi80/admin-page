import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Product} from "../models/products";

interface BasketItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
   BasketItemsSubject = new BehaviorSubject<Map<number, BasketItem>>(new Map());
  cartItems$ = this.BasketItemsSubject.asObservable();

  addToCart(product: Product) {
    const currentItems = this.BasketItemsSubject.getValue();

    if (currentItems.has(product.id)) {
      const existingItem = currentItems.get(product.id)!;
      existingItem.quantity += 1;
      currentItems.set(product.id, existingItem);
    } else {
      currentItems.set(product.id, { product, quantity: 1 });
    }

    this.BasketItemsSubject.next(new Map(currentItems));
  }

  getTotalItemsCount(): number {
    const currentItems = this.BasketItemsSubject.getValue();
    let totalCount = 0;
    currentItems.forEach(item => totalCount += item.quantity);
    return totalCount;
  }

  decreaseQuantity(product: Product) {
    const currentItems = this.BasketItemsSubject.getValue();

    if (currentItems.has(product.id)) {
      const existingItem = currentItems.get(product.id)!;
      existingItem.quantity -= 1;

      if (existingItem.quantity <= 0) {

        currentItems.delete(product.id);
      } else {
        currentItems.set(product.id, existingItem);
      }

      this.BasketItemsSubject.next(new Map(currentItems));
    }
  }


  increaseQuantity(product: Product) {
    const currentItems = this.BasketItemsSubject.getValue();

    if (currentItems.has(product.id)) {
      const existingItem = currentItems.get(product.id)!;
      existingItem.quantity += 1;
      currentItems.set(product.id, existingItem);
      this.BasketItemsSubject.next(new Map(currentItems));
    }
  }
}

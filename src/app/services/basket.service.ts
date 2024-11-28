import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {Product} from "../models/products";

interface BasketItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basketItemsSubject = new BehaviorSubject<Map<number, BasketItem>>(new Map());
  basketItems$ = this.basketItemsSubject.asObservable();

  addToCart(product: Product) {
    this.basketItemsSubject.next(
      new Map(this.basketItemsSubject.getValue()).set(product.id, { product, quantity: 1 })
    );
  }

  get basketItemsCount$() {
    return this.basketItems$.pipe(
      map((items) =>
        Array.from(items.values()).reduce((total, item) => total + item.quantity, 0)
      )
    );
  }

  changeQuantity(product: Product, change: number) {
    const currentItems = this.basketItemsSubject.getValue();
    const existingItem = currentItems.get(product.id);
    if (existingItem) {
      existingItem.quantity += change;

      if (existingItem.quantity <= 0) {
        currentItems.delete(product.id);
      }
    } else if (change > 0) {
      currentItems.set(product.id, {product, quantity: change});

    }
    this.basketItemsSubject.next(new Map(currentItems));
  }
}

import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../../services/basket.service";
import {initFlowbite} from "flowbite";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Product} from "../../../models/products";

class BasketItem {
}

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  cartItems: Map<number, { product: Product; quantity: number }> = new Map();
  cartItemsArray: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    initFlowbite();

    this.basketService.basketItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.cartItemsArray = Array.from(cartItems.values());
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.cartItemsArray.forEach((item) => {
      this.totalPrice += item.product.price * item.quantity;
    });
  }

  changeQuantity(product: Product, change: number) {
    this.basketService.changeQuantity(product, change);
  }
}

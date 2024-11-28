import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../../services/basket.service";
import {initFlowbite} from "flowbite";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Product} from "../../../models/products";
import {ClientAuthService} from "../../../services/client-auth.service";

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
  ClientLogin: boolean = false;
  constructor(private basketService: BasketService,private clientAuth: ClientAuthService) {}

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

  paid(){
    this.clientAuth.loggedIn$.subscribe(isLoggedIn => {
      this.ClientLogin = isLoggedIn;
      if (isLoggedIn) {
        alert('paid successfully');
      } else {
        alert('please login');
      }
    });
  }

  changeQuantity(product: Product, change: number) {
    this.basketService.changeQuantity(product, change);
  }
}

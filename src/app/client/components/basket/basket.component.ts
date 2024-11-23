import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../../services/basket.service";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  cartItems: any[] = [];

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.basketService.getCartItems().subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems)
    });

    this.basketService.getCartItemsCount().subscribe(count => {
      console.log(`Total items in basket: ${count}`);
    });
  }
}

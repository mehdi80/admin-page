import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {initFlowbite} from "flowbite";
import {BasketService} from "../../../services/basket.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-client-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent implements OnInit {

  cartItemsCount$: Observable<number>;

  constructor(private basketService: BasketService) {
    this.cartItemsCount$ = this.basketService.basketItemsCount$;
  }

  ngOnInit() {
    initFlowbite();
  }
}

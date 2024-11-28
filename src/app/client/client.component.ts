import {Component, OnInit} from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {ProductComponent} from "./components/product/product.component";
import {ClientHeaderComponent} from "./components/client-header/client-header.component";

import {BasketComponent} from "./components/basket/basket.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    ClientHeaderComponent,
    BasketComponent
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{
ngOnInit() {

}
}

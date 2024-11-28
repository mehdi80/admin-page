import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {initFlowbite} from "flowbite";
import {BasketService} from "../../../services/basket.service";
import {Observable} from "rxjs";
import {ClientAuthService} from "../../../services/client-auth.service";

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
  clientLoggedIn: boolean = false;
  constructor(private basketService: BasketService,private clientAuth: ClientAuthService) {
    this.cartItemsCount$ = this.basketService.basketItemsCount$;
  }

  ngOnInit() {
    initFlowbite();

    this.clientAuth.loggedIn$.subscribe(ClientLoggedIn=>{
      this.clientLoggedIn=ClientLoggedIn;
    })
  }

  logout(){
    this.clientAuth.logout()
  }
}

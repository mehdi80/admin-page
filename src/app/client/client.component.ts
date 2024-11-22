import {Component} from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {ProductComponent} from "./components/product/product.component";
import {ClientHeaderComponent} from "./components/client-header/client-header.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent,
    ClientHeaderComponent
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent{

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {ProductComponent} from "./components/product/product.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductComponent
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{
constructor(private activeRoute: ActivatedRoute,) { }

  ngOnInit() {
  this.activeRoute.params.subscribe(params => {
    console.log(params['url']);
  })
  }

}

import {Component, OnInit} from '@angular/core';
import {GetProductsService} from "../../../services/get-products.service";
import {Product} from "../../../models/products";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  products: Product[]|null = null;
  constructor(private productService: GetProductsService) {}


  ngOnInit() {
    this.showProducts()
  }

  showProducts(){
    this.productService.getProducts().subscribe(products => {
      this.products = products
    console.log(this.products);
    });
  }


}

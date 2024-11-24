import {Component, OnInit} from '@angular/core';
import {GetProductsService} from "../../../services/get-products.service";
import {Product} from "../../../models/products";
import {NgForOf, NgStyle} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FormsModule,
    NgStyle
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  products: Product[]|null = null;
  searchValue: string = '';
  searchedProduct: any;
  constructor(private productService: GetProductsService,private router:Router ,private route: ActivatedRoute,) {}


  ngOnInit() {
    this.showProducts()
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.searchValue = params['name'];
      }
    });

  }

  showProducts(){
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.searchedProduct = products;
    });
  }

  onSearch(event: Event): void {
    event.preventDefault();
    (this.searchValue) ? this.router.navigate(['client/products'],
      {queryParams: {name: this.searchValue}}) : this.router.navigate(['client/products'])
    this.filterProducts();
  }

  filterProducts() {
    if (this.searchValue.trim() === '') {
      this.searchedProduct = this.products;
    } else {
      this.searchedProduct = this.products?.filter(product =>
        product.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
      if (this.searchedProduct.length === 0) {
        alert('هیچ محصولی پیدا نشد.');
      }
    }
  }
}

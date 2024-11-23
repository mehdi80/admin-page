import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/products";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GetProductsService} from "../../../services/get-products.service";
import {BasketService} from "../../../services/basket.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  products: Product[] | null = null;
  selectedProduct: Product | undefined;
  quantity: number = 0;
  productQuantity: number =1;

  constructor(
    private activatedRute: ActivatedRoute,
    private productService: GetProductsService,
    private basketService: BasketService
  ) {
  }

  ngOnInit() {
    this.loadProduct()
  }

  loadProduct() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.findProduct()
    });
  }

  findProduct(): void {
    this.activatedRute.params.subscribe((params) => {
      const productId: number = +params['id'];
      this.selectedProduct = this.products?.find((product: any): boolean =>
        product.id === productId);
      if (this.selectedProduct) {
        this.productQuantity = this.selectedProduct.quantity
      }
    });
  }

  increaseQuantity(): void {
    if (this.quantity <= this.productQuantity) {
      ++this.quantity;
      this.basketService.addToCart(this.selectedProduct, this.quantity);
    }

  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      --this.quantity;
    }
  }

  addToBasket() {
    if (this.selectedProduct) {
      this.basketService.addToCart(this.selectedProduct, this.quantity);
      ++this.quantity;
    }
  }
}

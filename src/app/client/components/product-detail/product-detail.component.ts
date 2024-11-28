import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/products";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GetProductsService} from "../../../services/get-products.service";
import {BasketService} from "../../../services/basket.service";
import {NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  products: Product[] | null = null;
  selectedProduct: any;
  quantity: number = 0;
  productQuantity: number =1;

  private addToBasketSubject = new BehaviorSubject<Product | undefined>(undefined);
  addToBasket$ = this.addToBasketSubject.asObservable();

  constructor(
    private activatedRute: ActivatedRoute,
    private productService: GetProductsService,
    private basketService: BasketService

  ) {
    this.addToBasket$.subscribe((product) => {
      if (product) {
        this.basketService.addToCart(product);
      }
    });

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

  findProduct() {
    this.activatedRute.params.subscribe((params) => {
      const productId: number = +params['id'];
      this.selectedProduct = this.products!.find((product:Product) =>
        product.id === productId);
      if (this.selectedProduct) {
        this.productQuantity = this.selectedProduct.quantity;
      }
    });
  }

  addToBasket() {
    this.basketService.changeQuantity(this.selectedProduct,+1);
  }

  changeQuantity(product: Product, change: number) {
    this.basketService.changeQuantity(product, change);
  }

  isInCart(product: Product): boolean {
    const cartItems = this.basketService.basketItemsSubject.getValue();
    return cartItems.has(product.id);
  }

  getProductQuantity(product: Product): number {
    const cartItems = this.basketService.basketItemsSubject.getValue();
    return cartItems.get(product.id)?.quantity || 0;
  }
}

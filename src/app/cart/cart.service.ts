import { ProductService } from '../products/product.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private productService: ProductService) {}

  cartActive: { product: Product; quantity: number }[] = [];
  cartActiveLength: number = 0;

  addToCart(sku: string) {
    let product = this.productService.getProduct(sku)[0];
    let found: boolean = false;

    this.cartActive.forEach((elem) => {
      // Item existing in cart scenario
      if (elem.product === product) {
        elem.quantity++;
        found = true;
        return;
      }
    });
    // Item found in cart scenario
    if (!found) {
      this.cartActive.push({
        product: product,
        quantity: 1,
      });
    }
    this.cartUpdated.next(this.getActiveCart());
    this.cartLength.next(this.getCartLength());
  }

  getActiveCart() {
    return this.cartActive.slice();
  }

  // cartUpdated = new EventEmitter<any>();
  cartUpdated = new Subject<{ product: Product; quantity: number }[]>();
  cartLength = new Subject<number>();

  deleteFromCart(sku: string) {
    this.cartActive = this.cartActive.filter((elem) => {
      return elem.product.sku !== sku;
    });

    // this.cartUpdated.emit(this.cartActive.slice());
    this.cartUpdated.next(this.cartActive.slice());
    this.cartLength.next(this.getCartLength());
  }

  getCartLength() {
    let acc = 0;
    this.cartActive.forEach((obj) => {
      acc += obj.quantity;
    });
    this.cartActiveLength = acc;
    return this.cartActiveLength;
  }
}

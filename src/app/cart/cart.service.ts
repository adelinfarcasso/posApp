import { ProductService } from '../products/product.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private productService: ProductService) {}

  //TODO obj - export la o clasa
  cartActive: { product: Product; quantity: number }[] = [];
  cartActiveLength: number = 0;
  cartTotalAmount: number = 0;

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
    this.cartTotal.next(this.getCartTotal());
  }

  getActiveCart() {
    return this.cartActive.slice();
  }

  // cartUpdated = new EventEmitter<any>();
  cartUpdated = new Subject<{ product: Product; quantity: number }[]>();
  cartLength = new Subject<number>();
  cartTotal = new Subject<number>();
  cartQtyChange = new Subject<{ product: Product; quantity: number }[]>();

  deleteFromCart(sku: string) {
    this.cartActive = this.cartActive.filter((elem) => {
      return elem.product.sku !== sku;
    });

    // this.cartUpdated.emit(this.cartActive.slice());
    this.cartUpdated.next(this.cartActive.slice());
    this.cartLength.next(this.getCartLength());
    this.cartTotal.next(this.getCartTotal());
  }

  getCartLength() {
    let acc = 0;
    this.cartActive.forEach((obj) => {
      acc += obj.quantity;
    });
    this.cartActiveLength = acc;
    return this.cartActiveLength;
  }

  updateCartItemQty(sku: string, operator: string) {
    this.cartActive.forEach((elem, idx) => {
      if (elem.product.sku === sku) {
        this.cartActive[idx].quantity += operator === 'add' ? +1 : -1;
      }
      if (this.cartActive[idx]?.quantity === 0) this.deleteFromCart(sku);
    });

    this.cartQtyChange.next(this.cartActive);
    this.cartUpdated.next(this.cartActive.slice());
    this.cartLength.next(this.getCartLength());
    this.cartTotal.next(this.getCartTotal());
  }

  getCartTotal() {
    let acc = 0;
    this.cartActive.forEach((obj) => {
      acc += obj.product.price * obj.quantity;
    });
    this.cartTotalAmount = acc;
    return this.cartTotalAmount;
  }
}

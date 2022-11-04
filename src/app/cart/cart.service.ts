import { ProductService } from '../products/product.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';
import { LocalService } from './order-component/local.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private productService: ProductService,
    private localService: LocalService,
    private _snackBar: MatSnackBar
  ) {}

  //TODO obj - export la o clasa

  cartActiveLength: number = 0;
  cartTotalAmount: number = 0;

  cartUpdated = new Subject<{ product: Product; quantity: number }[]>();
  cartLength = new Subject<number>();
  cartTotal = new Subject<number>();
  cartQtyChange = new Subject<{ product: Product; quantity: number }[]>();

  addToCart(sku: string) {
    let activeCart = this.getActiveCart();
    let product = this.productService.getProduct(sku)[0];

    let found: boolean = false;

    activeCart.forEach((elem) => {
      // Item existing in cart scenario
      if (elem.product.sku === product.sku) {
        elem.quantity++;
        found = true;
        return;
      }
    });
    // Item found in cart scenario
    if (!found) {
      activeCart.push({
        product: product,
        quantity: 1,
      });
    }
    this.setActiveCart('cart', activeCart);
    // Open snackBar
    this.snackBarOpen(`"${product.name}" added to cart!`);
    this.emitter();
  }

  getActiveCart() {
    return this.localService.getLocalCart('cart');
  }

  setActiveCart(key: String, value: Object) {
    this.localService.setActiveCart(key, value);
  }

  deleteFromCart(sku: string) {
    let cartActive = this.getActiveCart();
    let product: Product;
    cartActive = cartActive.filter(
      (elem: { product: Product; quantity: Number }) => {
        // if - For snackbar
        if (elem.product.sku === sku) {
          product = elem.product;
        }
        return elem.product.sku !== sku;
      }
    );

    this.snackBarOpen(`"${product.name}" was deleted from cart!`);
    this.setActiveCart('cart', cartActive);
    this.emitter();
  }

  deleteCartAll() {
    this.setActiveCart('cart', []);
    this.emitter();
  }

  getCartLength() {
    let cartActive = this.getActiveCart();
    let acc = 0;
    cartActive.forEach((obj) => {
      acc += obj.quantity;
    });
    this.cartActiveLength = acc;
    return this.cartActiveLength;
  }

  updateCartItemQty(sku: string, operator: string) {
    let cartActive = this.getActiveCart();
    let deleted: boolean;
    cartActive.forEach((elem, idx) => {
      if (elem.product.sku === sku) {
        cartActive[idx].quantity += operator === 'add' ? +1 : -1;
      }
      if (cartActive[idx].quantity === 0) {
        deleted = true;
        this.snackBarOpen(
          `"${cartActive[idx].product.name}" was deleted from cart!`
        );
        cartActive.splice(idx, 1);
      }
    });

    this.getCartTotal();
    this.setActiveCart('cart', cartActive);

    this.cartQtyChange.next(cartActive);
    this.cartUpdated.next(cartActive);
    this.cartLength.next(this.getCartLength());
    this.cartTotal.next(this.getCartTotal());
  }

  getCartTotal() {
    let cartActive = this.getActiveCart();
    let acc = 0;
    cartActive.forEach((obj) => {
      acc += obj.product.price * obj.quantity;
    });

    this.setActiveCart('cartTotal', acc);

    return acc;
  }

  snackBarOpen(msg: string) {
    this._snackBar.open(msg, 'Dismiss', {
      duration: 5000,
    });
  }

  emitter() {
    this.cartQtyChange.next(this.getActiveCart());
    this.cartUpdated.next(this.getActiveCart());
    this.cartLength.next(this.getCartLength());
    this.cartTotal.next(this.getCartTotal());
  }
}

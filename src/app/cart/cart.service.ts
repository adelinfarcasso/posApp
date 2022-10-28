import { ProductService } from '../products/product.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private productService: ProductService) {}
  cartActive = [
    //FIXME
  ];

  addToCart(sku: string) {
    let product = this.productService.getProduct(sku)[0];
    let existing: boolean;
    this.cartActive.forEach((cartObj): boolean => {
      if (cartObj.product.sku === sku) {
        cartObj.quantity++;
        existing = true;
        return;
      } else {
        existing = false;
      }
      return;
    });

    if (!existing) {
      this.cartActive.push({
        product: product,
        quantity: 1,
      });
    }
    console.log(this.cartActive);
  }

  getActiveCart = () => this.cartActive.slice();

  cartUpdated = new EventEmitter<any>();

  deleteFromCart(sku: string) {
    this.cartActive = this.cartActive.filter((elem) => {
      return elem.product.sku !== sku;
    });
    this.cartUpdated.emit(this.cartActive.slice());
  }
}

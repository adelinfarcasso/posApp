import { ProductService } from '../products/product.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';
import { LocalService } from './order-component/local.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(
    private productService: ProductService,
    private localService: LocalService
  ) {}

  //TODO obj - export la o clasa
  // cartActive: { product: Product; quantity: number }[];

  // [
  //   {
  //     product: {
  //       name: 'iPhone 13 Pro 256 GB',
  //       sku: 'P002',
  //       imgSrc:
  //         'https://istyle.ro/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_13_pro_max_sierra_blue_pdp_image_position-1a__wwen_9_3.jpg',
  //       description:
  //         'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum molestiae culpa cum illo quisquam nulla reprehenderit obcaecati repellendus dicta ipsa maxime at, labore, qui ab!',
  //       price: 5000,
  //       category: 'Smartphones',
  //     },
  //     quantity: 1,
  //   },
  // ];
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
    this.setActiveCart(activeCart);

    this.cartUpdated.next(activeCart);
    this.cartLength.next(this.getCartLength());
    this.cartTotal.next(this.getCartTotal());
  }

  getActiveCart() {
    return this.localService.getLocalCart();
  }

  setActiveCart(cart) {
    this.localService.setActiveCart(cart);
  }

  deleteFromCart(sku: string) {
    let cartActive = this.getActiveCart();
    cartActive = cartActive.filter((elem) => {
      return elem.product.sku !== sku;
    });

    this.setActiveCart(cartActive);

    this.cartUpdated.next(cartActive);
    this.cartLength.next(this.getCartLength());
    this.cartTotal.next(this.getCartTotal());
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
        cartActive.splice(idx, 1);
      }
    });

    this.setActiveCart(cartActive);

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

    this.setActiveCart(cartActive);

    return acc;
  }
}

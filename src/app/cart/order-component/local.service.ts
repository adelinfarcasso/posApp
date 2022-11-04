// Responsabil strict de comunicarea cu localStorage

import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/products/product.model';

export class LocalService {
  constructor() {}

  ordersUpdate = new Subject<Object[]>();
  orderSubmitted = new Subject<null>();

  getLocalCart(key: String) {
    return JSON.parse(localStorage.getItem(`${key}`)) === null
      ? []
      : JSON.parse(localStorage.getItem(`${key}`));
  }

  setActiveCart(key: String, value: Object) {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  }

  setOrder(shippingData: Object) {
    let orders = this.getLocalCart('orders');
    let cart = this.getLocalCart('cart');
    let total = this.getLocalCart('cartTotal');

    orders.push({
      products: cart,
      total: total,
      shippingData: shippingData,
      id: Date.now(),
    });

    this.ordersUpdate.next(orders);

    localStorage.setItem('orders', JSON.stringify(orders));
  }
}

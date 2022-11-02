import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  dataSource = [];
  activeCart = [];
  columnsToDisplay = [];

  constructor(private cartService: CartService) {}

  deleteCartItem(sku: string) {
    this.cartService.deleteFromCart(sku);
  }

  drawActiveCart() {
    let holder = [];
    this.activeCart.forEach((elem) => {
      holder.push({
        imgSrc: elem.product.imgSrc,
        sku: elem.product.sku,
        name: elem.product.name,
        price: elem.product.price,
        qty: elem.quantity,
        actions: '',
      });
    });
    // Force to re-render
    this.dataSource = holder;
  }

  updateQty(sku: string, operator: string) {
    this.cartService.updateCartItemQty(sku, operator);
  }

  ngOnInit(): void {
    this.activeCart = this.cartService.getActiveCart();
    this.drawActiveCart();
    this.columnsToDisplay = ['imgSrc', 'name', 'price', 'qty', 'actions'];

    this.cartService.cartUpdated.subscribe((value) => {
      this.activeCart = value;
      this.drawActiveCart();
    });

    this.cartService.cartQtyChange.subscribe((value) => {
      this.activeCart = value;
      this.drawActiveCart();
    });
  }

  ngOnDestroy() {
    // this.cartService.cartUpdated.unsubscribe();
  }
}

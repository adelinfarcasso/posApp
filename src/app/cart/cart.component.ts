import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { LocalService } from './order-component/local.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  dataSource = [];
  activeCart = [];
  cartTotal: Number;
  columnsToDisplay = [];
  subs: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private localService: LocalService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(msg: string) {
    let durationSec = 5;
    this._snackBar.open(msg, msg, {
      duration: durationSec * 1000,
    });
  }

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
    console.log(this.activeCart);
  }

  ngOnInit(): void {
    this.activeCart = this.cartService.getActiveCart();
    this.drawActiveCart();
    this.columnsToDisplay = ['imgSrc', 'name', 'price', 'qty', 'actions'];

    this.subs.push(
      this.cartService.cartUpdated.subscribe((value) => {
        this.activeCart = value;
        this.drawActiveCart();
      })
    );

    this.subs.push(
      this.cartService.cartQtyChange.subscribe((value) => {
        this.activeCart = value;
        this.drawActiveCart();
      })
    );

    this.subs.push(
      this.cartService.cartTotal.subscribe((value) => {
        this.cartTotal = value;
      })
    );

    this.subs.push(
      this.localService.orderSubmitted.subscribe(() => {
        this.cartService.emitter();
      })
    );

    this.cartService.emitter();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

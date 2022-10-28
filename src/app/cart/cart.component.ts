import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  dataSource = [];
  activeCart = [];
  columnsToDisplay = [];

  constructor(private cartService: CartService) {}

  deleteCartItem(sku: string) {
    this.cartService.deleteFromCart(sku);
  }

  // Force to re-render
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

  ngOnInit(): void {
    this.activeCart = this.cartService.getActiveCart();
    this.drawActiveCart();
    this.columnsToDisplay = ['imgSrc', 'name', 'price', 'qty', 'actions'];

    this.cartService.cartUpdated.subscribe((value) => {
      this.activeCart = value;
      this.drawActiveCart();
    });
  }
}

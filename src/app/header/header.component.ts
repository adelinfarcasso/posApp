import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from './header.service';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItems = [];
  cartEmpty: boolean = true;
  subs: Subscription[] = [];
  cartItemsNo: number;
  cartTotal: number;

  constructor(
    private headerService: HeaderService,
    private cartService: CartService
  ) {}

  onSearchToggle() {
    this.headerService.toggleSearch.next();
  }

  ngOnInit(): void {
    this.subs.push(
      this.cartService.cartUpdated.subscribe((data) => {
        this.cartItems = data;
        this.cartEmpty = this.cartItems.length > 0 ? false : true;
      })
    );
    this.subs.push(
      this.cartService.cartLength.subscribe((data) => {
        this.cartItemsNo = data;
      })
    );

    this.subs.push(
      this.cartService.cartTotal.subscribe((data) => {
        this.cartTotal = data;
      })
    );

    // To initialize from localStorage
    this.cartService.emitter();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

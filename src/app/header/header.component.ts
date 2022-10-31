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
  cartSubscription: Subscription;
  activeCartLength: Subscription;
  cartItemsNo: number;

  constructor(
    private headerService: HeaderService,
    private cartService: CartService
  ) {}

  onSearchToggle() {
    this.headerService.toggleSearch.next();
  }
  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartUpdated.subscribe((data) => {
      this.cartItems = data;
      this.cartEmpty = this.cartItems.length > 0 ? false : true;
    });
    this.activeCartLength = this.cartService.cartLength.subscribe((data) => {
      this.cartItemsNo = data;
    });
  }

  ngOnDestroy() {
    // NOTE: daca las, la return din /cart -> err "unsubscribed"
    // this.cartSubscription.unsubscribe();
  }
}

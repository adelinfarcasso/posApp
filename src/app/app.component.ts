import { Component, Input, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { LocalService } from './cart/order-component/local.service';
import { HeaderService } from './header/header.service';
import { CategoriesService } from './products/product-list/categories/categories.service';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    ProductService,
    HeaderService,
    CartService,
    CategoriesService,
    LocalService,
  ],
})
export class AppComponent {
  constructor(private localService: LocalService) {}
  title = 'posApp';
}

import { Component, Input } from '@angular/core';
import { CartService } from './cart/cart.service';
import { HeaderService } from './header/header.service';
import { CategoriesService } from './products/product-list/categories/categories.service';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService, HeaderService, CartService, CategoriesService],
})

// @Input() contentTemplate;
export class AppComponent {
  title = 'posApp';
}

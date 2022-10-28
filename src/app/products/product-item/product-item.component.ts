import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  item: Product | undefined;
  @Input() product: Product;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  addToCart(sku: string) {
    this.cartService.addToCart(sku);
  }
  ngOnInit(): void {}
}

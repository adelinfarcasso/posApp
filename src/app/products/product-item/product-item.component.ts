import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  item: Product | undefined;
  @Input() product: Product;
  constructor(private cartService: CartService) {}

  addToCart(sku: string) {
    this.cartService.addToCart(sku);
  }
  ngOnInit(): void {}
}

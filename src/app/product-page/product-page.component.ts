import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}
  productSku: string;
  product: Product;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((obs) => {
      this.productSku = obs.id;
      this.product = this.productService.getProduct(this.productSku)[0];
    });
  }

  addToCart(sku: string) {
    this.cartService.addToCart(sku);
  }
}

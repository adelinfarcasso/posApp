import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationService } from '../pagination/pagination.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CategoriesService } from './categories/categories.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedCategory = 'All';
  subs = new Subscription();

  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts('All');

    this.subs.add(
      this.categoryService.categoryForm.valueChanges.subscribe((value) => {
        this.selectedCategory = value;
        this.products = this.productService.getProducts(value);
      })
    );

    // subscribe
    this.subs.add(
      this.productService.onUpdateProducts.subscribe(
        (value) => (this.products = value)
      )
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

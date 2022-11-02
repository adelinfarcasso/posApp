import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
  selectedCategories = 'All';
  subs = new Subscription();

  constructor(private pS: ProductService, private cS: CategoriesService) {}

  ngOnInit(): void {
    this.products = this.pS.getProducts('All');
    this.subs.add(
      this.cS.categoriesForm.valueChanges.subscribe((observer) => {
        this.selectedCategories = observer;
        this.products = this.pS.getProducts(this.selectedCategories);
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

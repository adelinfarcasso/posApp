import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CategoriesService } from './categories/categories.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedCategories = 'All';

  constructor(private pS: ProductService, private cS: CategoriesService) {}

  ngOnInit(): void {
    this.products = this.pS.getProducts('All');

    this.cS.categoriesForm.valueChanges.subscribe((observer) => {
      this.selectedCategories = observer;
      this.products = this.pS.getProducts(this.selectedCategories);
    });
  }
}

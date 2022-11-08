import { Injectable } from '@angular/core';
import { ProductService } from '../../product.service';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private productService: ProductService) {}

  categoryForm = new FormControl('');
  currentCategory: string = 'All';

  // Populate form
  getCategories(): Set<String> {
    let categories = [];
    this.productService.getProducts('All').forEach((elem) => {
      categories.push(elem.category);
    });
    return new Set(categories);
  }

  emitCategory(category: string) {
    this.productService.emitPagesLengthCategory(category);
    this.currentCategory = category;
  }
}

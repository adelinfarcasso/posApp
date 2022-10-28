import { Injectable } from '@angular/core';
import { ProductService } from '../../product.service';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private pS: ProductService) {}

  categoriesForm = new FormControl('');

  // Populate form
  getCategories(): Set<String> {
    let categories = [];
    this.pS.getProducts('All').forEach((elem) => {
      categories.push(elem.category);
    });
    return new Set(categories);
  }
}

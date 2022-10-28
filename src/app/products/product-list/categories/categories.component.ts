import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { ProductService } from '../../product.service';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: Set<String>;
  selectedCategories: String;

  constructor(private pS: ProductService, private cS: CategoriesService) {}

  categories = this.cS.categoriesForm;

  ngOnInit(): void {
    this.categories.valueChanges.subscribe((observer) => {
      this.selectedCategories = observer;
    });
    this.categoriesList = this.cS.getCategories();
  }
}

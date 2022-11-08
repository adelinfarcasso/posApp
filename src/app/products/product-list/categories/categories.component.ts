import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: Set<String>;
  selectedCategory: String;

  constructor(private categoryService: CategoriesService) {}

  categories = this.categoryService.categoryForm;

  ngOnInit(): void {
    this.categories.valueChanges.subscribe((value) => {
      this.selectedCategory = value;
      this.categoryService.emitCategory(value);
    });
    this.categoriesList = this.categoryService.getCategories();
  }
}

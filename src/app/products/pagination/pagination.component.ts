import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CategoriesService } from '../product-list/categories/categories.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  compPageSize: number;
  compPageIndex: number;
  compPagesLength: number;

  constructor(
    private paginationService: PaginationService,
    private productService: ProductService,
    private categoryService: CategoriesService
  ) {}

  handlePage(e: PageEvent) {
    this.paginationService.pageSize = e.pageSize; // subject TODO
    this.paginationService.pageIndex = e.pageIndex;
    //emit
    this.productService.onUpdateProducts.next(
      this.productService.getProductsPaginated(
        this.categoryService.currentCategory
      )
    );
  }

  ngOnInit(): void {
    this.compPageIndex = this.paginationService.pageIndex;
    this.compPageSize = this.paginationService.pageSize;
    this.compPagesLength = this.productService.getProductsLength();

    this.paginationService.pageLengthChange.subscribe((data) => {
      this.compPagesLength = data;
    });
  }
}

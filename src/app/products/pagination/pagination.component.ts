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
  compPageDetails = {
    compPageSize: 0,
    compPageIndex: 0,
    compPagesLength: 0,
  };

  constructor(
    private paginationService: PaginationService,
    private productService: ProductService,
    private categoryService: CategoriesService
  ) {}

  handlePage(e: PageEvent) {
    this.compPageDetails.compPageIndex =
      this.paginationService.paginationDetails.pageIndex = e.pageIndex;
    this.compPageDetails.compPageSize =
      this.paginationService.paginationDetails.pageSize = e.pageSize;
    this.paginationService.paginationDetails.totalLength =
      this.productService.getProductsLength();

    console.log(e);

    //emit
    this.productService.onUpdateProducts.next(
      this.productService.getProductsPaginated(
        this.categoryService.currentCategory
      )
    );
  }

  ngOnInit(): void {
    this.compPageDetails.compPagesLength =
      this.productService.getProductsLength();

    this.paginationService.pageChange.subscribe((data) => {
      console.log(data, 'data');

      this.paginationService.paginationDetails.pageIndex =
        this.compPageDetails.compPageIndex = data.pageIndex;
      this.paginationService.paginationDetails.pageSize =
        this.compPageDetails.compPageSize = this.compPageDetails.compPageSize;
      this.paginationService.paginationDetails.totalLength =
        this.compPageDetails.compPagesLength = data.totalLength;

      console.log(this.paginationService.paginationDetails.pageIndex);
      console.log(this.paginationService.paginationDetails.pageSize);
      console.log(this.paginationService.paginationDetails.totalLength);
    });
  }
}

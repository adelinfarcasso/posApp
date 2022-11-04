import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  productsArr: Product[] = [];
  pageIndex: number;
  pageSize: number;
  totalLength: number;
  currentPage = 0;

  constructor(private productService: ProductService) {}

  handlePage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.totalLength = e.length;
  }

  iterator() {
    const start = this.pageSize * this.currentPage;
    const end = (this.currentPage + 1) * this.pageSize;
  }
  ngOnInit(): void {
    this.productsArr = this.productService.getProducts('all');
    this.paginator.length = this.productsArr.length;
    this.pageSize = this.paginator.pageSize;
  }
}

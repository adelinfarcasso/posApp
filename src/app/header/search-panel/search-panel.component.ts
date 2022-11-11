import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';
import { HeaderService } from '../header.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  isVisible = true;
  searchValue: string = '';
  options = [];
  filteredOptions: Observable<any>;
  searchFormControl = new FormControl<Product | string>('');

  constructor(
    private headerService: HeaderService,
    private productService: ProductService
  ) {}
  @ViewChild('search', { static: true }) searchElem: any;

  ngOnInit(): void {
    this.options = this.productService.getProducts('All');
    this.filteredOptions = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        if (name.length <= 2) return;

        return name ? this._filter(name as string) : this.options.slice();
      })
    );

    this.headerService.toggleSearch.subscribe(() => {
      this.searchElem.toggle();
      this.isVisible = !this.isVisible;
      console.log(this.isVisible);
    });
  }

  // TODO: reset search field after click
  onSearchComplete() {
    this.searchElem.toggle();
    this.isVisible = !this.isVisible;
    this.displayFn;
  }

  displayFn(product: Product): string {
    return product && product.name ? product.name : '';
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}

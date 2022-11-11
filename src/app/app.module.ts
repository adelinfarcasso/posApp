// Core, Platform
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { PaginationComponent } from './products/pagination/pagination.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductsComponent } from './products/products.component';
import { SearchPanelComponent } from './header/search-panel/search-panel.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './products/product-list/categories/categories.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MatBadgeModule } from '@angular/material/badge';
import { OrderComponentComponent } from './cart/order-component/order-component.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const appRoutes = [
  {
    path: '',
    component: ProductsComponent,
    children: [],
  },
  {
    path: 'cart',
    component: CartComponent,
    children: [],
  },
  {
    path: 'product/:id',
    component: ProductPageComponent,
    children: [],
  },
  {
    path: 'my-orders',
    component: ClientOrdersComponent,
    children: [],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    PaginationComponent,
    ProductItemComponent,
    ProductsComponent,
    HeaderComponent,
    SearchPanelComponent,
    CartComponent,
    CategoriesComponent,
    ProductPageComponent,
    OrderComponentComponent,
    ClientOrdersComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

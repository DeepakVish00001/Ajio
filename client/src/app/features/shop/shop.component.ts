import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopServices } from '../../core/services/shop.services';
import { ProductItemComponent } from './product-item/product-item.component';
import { Category } from '../../shared/models/category';
import { Brands } from '../../shared/models/brands';
import { ShopParams } from '../../shared/models/shopParams';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComonent } from './pagination/pagination.comonent';
import { MatIcon } from '@angular/material/icon';
import { PaginationTwoComonent } from './pagination-two/pagination-two.comonent';


@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    SidebarComponent,
    PaginationComonent,
    PaginationTwoComonent,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit, OnDestroy {
  private shopServices = inject(ShopServices);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  products?: Pagination<Product>;
  categories: Category[] = [];
  brands: Brands[] = [];

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: ' Price: Low to High', value: 'priceAsc' },
    { name: ' Price: High to Low', value: 'priceDesc' },
  ]
  shopParams = new ShopParams();
  pageSizeOptions = [5, 10, 15, 20, 50, 100]
  // ngOnInit(): void {
  //   this.getBrands()
  //   this.getCategories();
  //   this.getProducts();
  // }

  ngOnInit(): void {

    this.getBrands();
    this.getCategories();
    this.getProducts();

    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(search => {

        this.shopParams.search = search;
        this.shopParams.pageIndex = 1;

        return this.shopServices.getProducts(this.shopParams);

      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.products = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  onSearchInput(search: string) {

    this.searchSubject.next(search.trim());

  }

  getProducts() {
    this.shopServices.getProducts(this.shopParams).subscribe({
      next: response => this.products = response,
      error: (error: any) => console.log(error)
    })
  }
  getCategories() {
    this.shopServices.getCategories().subscribe({
      next: response => this.categories = [{ id: 0, name: 'All' }, ...response],
      error: (error: any) => console.log(error)
    })
  }

  getBrands() {
    this.shopServices.getBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: (error: any) => console.log(error)
    })
  }

  // onSearchChange() {
  //   this.shopParams.search=this.shopParams.search.trim();
  //   this.shopParams.pageIndex = 1;
  //   this.getProducts();
  // }
  onSearchChange() {

    this.shopParams.search =
      this.shopParams.search.trim();

    this.shopParams.pageIndex = 1;

    this.getProducts();

  }

  clearSearch() {

    this.shopParams.search = '';
    this.shopParams.pageIndex = 1;

    this.getProducts();

  }
  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandsId = brandId
    this.shopParams.pageIndex = 1;
    this.getProducts()
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId
    this.shopParams.pageIndex = 1;
    this.getProducts()
  }

  /*--Sort By Name & Price--*/
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onPriceSelected(price: { minPrice: number; maxPrice: number }) {
    this.shopParams.minPrice = price.minPrice;
    this.shopParams.maxPrice = price.maxPrice;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }


  handlePageEvent(event: PageEvent) {
    this.shopParams.pageIndex = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopServices } from '../../core/services/shop.services';
import { ProductItemComponent } from './product-item/product-item.component';
import { Category } from '../../shared/models/category';
import { Brands } from '../../shared/models/brands';
import { ShopParams } from '../../shared/models/shopParams';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComonent } from './pagination/pagination.comonent';
import { MatIcon } from '@angular/material/icon';
import { PaginationTwoComonent } from './pagination-two/pagination-two.comonent';
import { SearchServices } from '../../core/services/search.services';
import { skip, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    SidebarComponent,
    PaginationComonent,
    PaginationTwoComonent,
    MatIcon,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {

  private shopServices = inject(ShopServices);

  private searchService = inject(SearchServices);

  private destroy$ = new Subject<void>()



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

  ngOnInit(): void {
    this.getBrands()
    this.getCategories();
    this.getProducts();

    this.searchService.search$.pipe(
      skip(1),
      takeUntil(this.destroy$)
    )
      .subscribe(search => {
        this.shopParams.search = search;
        this.shopParams.pageIndex = 1;
        this.getProducts();
      });
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


  /*--- Brands Filter---*/
  onBrandSelected(brandId: number) {
    this.shopParams.brandsId = brandId
    this.shopParams.pageIndex = 1;
    this.getProducts()
  }

  /*--- Category Filter---*/
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

  /*---MinPrice & MaxPrice Filter---*/
  onPriceSelected(price: { minPrice: number; maxPrice: number }) {
    this.shopParams.minPrice = price.minPrice;
    this.shopParams.maxPrice = price.maxPrice;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }


  /*-- Pagination Event --*/
  handlePageEvent(event: PageEvent) {
    this.shopParams.pageIndex = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  /*--- Custome Pagination ---*/
  handleCustomPageEvent(pageIndex: number) {
    this.shopParams.pageIndex = pageIndex + 1
    this.getProducts();
  }

}

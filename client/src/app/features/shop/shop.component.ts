import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopServices } from '../../core/services/shop.services';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatIcon } from '@angular/material/icon';
import { Category } from '../../shared/models/category';
import { Brands } from '../../shared/models/brands';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatIcon,
    MatPaginator
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopServices = inject(ShopServices);


  products?: Pagination<Product>;
  categories: Category[] = [];
  brands: Brands[] = [];

  // brandIdSelected = 0;
  // categoryIdSelected = 0;

  // sortSelected='name';
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: ' Price: Low to High', value: 'priceAsc' },
    { name: ' Price: High to Low', value: 'priceDesc' },
  ]
  shopParams = new ShopParams();
  pageSizeOptions = [5, 10, 15, 20]
  ngOnInit(): void {
    this.getBrands()
    this.getCategories();
    this.getProducts();
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


  onBrandSelected(brandId: number) {
    this.shopParams.brandsId = brandId
    this.getProducts()
  }

  onCategorySelected(categoryId: number) {
    this.shopParams.categoryId = categoryId
    this.getProducts()
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value
    this.shopParams.pageIndex=1;
    this.getProducts()
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageIndex = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }
}

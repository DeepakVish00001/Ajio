import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopServices } from '../../core/services/shop.services';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatIcon } from '@angular/material/icon';
import { Category } from '../../shared/models/category';
import { Brands } from '../../shared/models/brands';
import { ShopParams } from '../../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatIcon
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopServices = inject(ShopServices);


  products: Product[] = [];
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
  shopParams= new ShopParams();
  ngOnInit(): void {
    this.getBrands()
    this.getCategories();
    this.getProducts();
  }


  getProducts() {
    this.shopServices.getProducts(this.shopParams).subscribe({
      next: response => this.products = response.data,
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

  onSortSelected(event:any){
    this.shopParams.sort=event.target.value
    this.getProducts()
  }
}

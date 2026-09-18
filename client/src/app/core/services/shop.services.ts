import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);

  category: string[] = [];
  brands: string[] = [];

  getProducts() {
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product?pageSize=20')
  }

  getCategories() {
    if (this.category.length > 0) return
    return this.http.get<string[]>(this.baseUrl + 'product/category').subscribe({
      next: response => this.category = response
    })
  }
  getBrands() {
    if (this.brands.length > 0) return
    return this.http.get<string[]>(this.baseUrl + 'product/brands').subscribe({
      next: response => this.brands = response
    })
  }

}

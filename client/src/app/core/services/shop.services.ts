import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';
import { Category } from '../../shared/models/category';
import { Brands } from '../../shared/models/brands';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);



  getProducts() {
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product?pageSize=20')
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'product/category')
  }
  getBrands() {
    return this.http.get<Brands[]>(this.baseUrl + 'product/brands')
  }

}

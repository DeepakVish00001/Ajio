import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Pagination } from '../../shared/models/pagination';
import { Category } from '../../shared/models/category';
import { Brands } from '../../shared/models/brands';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  baseUrl = 'https://localhost:5001/api/';
  private http = inject(HttpClient);



  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandsId) params = params.append('brandId', shopParams.brandsId);
    if (shopParams.categoryId) params = params.append('categoryId', shopParams.categoryId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageIndex)
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product', { params })
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'product/category')
  }
  getBrands() {
    return this.http.get<Brands[]>(this.baseUrl + 'product/brands')
  }

}

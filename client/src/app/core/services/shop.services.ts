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

  getProducts() {
    return this.http.get<Pagination<Product>>(this.baseUrl + 'product')
  }

}
